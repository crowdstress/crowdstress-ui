use crate::geometry::get_vector_to_line;
use crate::human::Human;
use crate::primitives::{Point, Section};
use crate::vector::Vector;
use crate::{config, geometry};
use js_sys::Math;

struct ExitExtended {
    probability: f64,
    middle: Point,
    vector_to_target: Vector,
}

pub fn get_target(human: &Human, exit_sections: &Vec<Section>) -> Point {
    #[derive(Copy, Clone)]
    struct ExitGeometry {
        section: Section,
        middle: Point,
        vector_to_target: Vector,
        vector_from_human: Vector,
    }

    let exits: Vec<ExitGeometry> = exit_sections
        .iter()
        .map(|&exit| {
            let section_middle = geometry::get_section_middle(&exit);
            let vector_from_human = Vector::from_points(&human.coords, &section_middle);
            let vector_to_target = Vector::from_points(&exit[0], &exit[1])
                .normalize()
                .perpendicular()
                .product(config::TARGET_FROM_EXIT_DISTANCE);
            let factor = if vector_to_target.projection_to(&vector_from_human) < 0.0 {
                -1.0
            } else {
                1.0
            };
            let vector_to_target = vector_to_target.product(factor);
            ExitGeometry {
                section: exit,
                middle: section_middle,
                vector_to_target,
                vector_from_human,
            }
        })
        .filter(|exit| {
            let distance_to_exit = get_vector_to_line(exit.section, human.coords).get_length();
            web_sys::console::log_1(&distance_to_exit.into());
            distance_to_exit >= 1.0
            // Надо запоминать номера выходов, которые индивид уже прошел
        })
        .collect();

    let distances_sum: f64 = exits
        .iter()
        .map(|exit| exit.vector_from_human.get_length())
        .sum();

    let exits_extended: Vec<ExitExtended> = exits
        .iter()
        .map(|exit| ExitExtended {
            probability: if exits.len() > 1 {
                (distances_sum - exit.vector_from_human.get_length()) / distances_sum
            } else {
                1.0
            },
            middle: exit.middle,
            vector_to_target: exit.vector_to_target,
        })
        .collect();

    let selected_exit = select_exit(&exits_extended);

    selected_exit.vector_to_target.to_line(selected_exit.middle)[1]
}

fn select_exit(exits: &Vec<ExitExtended>) -> &ExitExtended {
    let rnd: f64 = Math::random();

    for exit in exits {
        let result = rnd - exit.probability;
        if result < 0.0 {
            return exit;
        }
    }

    &exits[0]
}
