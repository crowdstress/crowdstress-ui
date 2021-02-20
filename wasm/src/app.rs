use crate::human::Human;
use crate::{behaviour, config, physics};
use crowdstress_common::prelude::*;
use wasm_bindgen::JsValue;

#[derive(Serialize, Deserialize)]
pub struct App {
    started: bool,
    humans: Vec<Human>,
    walls: Vec<Section>,
    exits: Vec<Exit>,
}

impl App {
    pub fn tick(&mut self) -> JsValue {
        let mut new_humans: Vec<Human> = Vec::with_capacity(self.humans.len());

        for human in &self.humans {
            let mut human_vectors: Vec<Vector> = Vec::new();
            let mut passed_exits = human.passed_exits.clone();

            for exit in &self.exits {
                let is_passed = geometry::is_point_belongs_to_line(&exit.section, &human.coords);
                if is_passed && !passed_exits.contains(&exit.id) {
                    passed_exits.push(String::from(&exit.id));
                }
            }

            let possible_exits: Vec<Exit> = self
                .exits
                .iter()
                .filter(|exit| !passed_exits.contains(&exit.id))
                .map(|exit| Exit {
                    id: String::from(&exit.id),
                    section: exit.section,
                })
                .collect();
            let target = behaviour::get_target(human, &possible_exits);
            human_vectors.push(physics::f1(human, &target));

            for wall in &self.walls {
                let vector_to_line = geometry::get_vector_to_line(
                    &Section {
                        start: wall.start,
                        end: wall.end,
                    },
                    &human.coords,
                );
                if geometry::is_lines_intersects(
                    &vector_to_line
                        .normalize()
                        .product(9999.0)
                        .to_line(human.coords),
                    wall,
                ) {
                    human_vectors.push(physics::f2w(vector_to_line));
                }
            }

            for other_human in &self.humans {
                let is_self = other_human as *const Human == human as *const Human;
                if !is_self {
                    let vector_to_human = Vector::from_points(&human.coords, &other_human.coords);
                    human_vectors.push(physics::f2(vector_to_human));
                }
            }

            let mut result_vector: Vector = Vector::origin();

            for vector in human_vectors {
                result_vector = result_vector.add(&vector);
            }

            let a = result_vector.divide(config::HUMAN_MASS);
            let dr = a.product(config::DELTA_T.powf(2.0) * config::SCALING_FACTOR);

            new_humans.push(Human {
                coords: Point {
                    x: human.coords.x + dr.x,
                    y: human.coords.y + dr.y,
                },
                panic: if result_vector.get_length() > 800.0 {
                    100
                } else {
                    human.panic
                },
                passed_exits,
            });
        }

        self.humans = new_humans;
        JsValue::from_serde(&self).unwrap()
    }
}
