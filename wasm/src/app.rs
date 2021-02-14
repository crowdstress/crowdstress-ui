use crate::human::Human;
use crate::object::DrawingObject;
use crate::primitives::Section;
use crate::vector::Vector;
use crate::wall::Wall;
use crate::{behaviour, config, geometry, physics};
use wasm_bindgen::prelude::*;
use wasm_bindgen::JsValue;

#[derive(Serialize, Deserialize)]
pub struct App {
    started: bool,
    humans: Vec<Human>,
    walls: Vec<Wall>,
    exits: Vec<Section>,
}

impl App {
    pub fn init(humans_array: &JsValue, objects_array: &JsValue) -> App {
        let humans = humans_array.into_serde().unwrap();
        let objects: Vec<DrawingObject> = objects_array.into_serde().unwrap();
        let walls: Vec<Wall> = objects
            .iter()
            .map(|object| Wall::from_object(object))
            .flatten()
            .collect();
        let exits: Vec<Section> = objects
            .iter()
            .filter(|object| object.object_type == 4)
            .map(|object| [object.points[0], object.points[1]])
            .collect();

        App {
            started: false,
            humans,
            walls,
            exits,
        }
    }

    pub fn tick(&mut self) -> JsValue {
        let mut new_humans: Vec<Human> = Vec::with_capacity(self.humans.len());

        for human in &self.humans {
            let mut human_vectors: Vec<Vector> = Vec::new();

            let target = behaviour::get_target(human, &self.exits);
            human_vectors.push(physics::f1(human, &target));

            for wall in &self.walls {
                let vector_to_line =
                    geometry::get_vector_to_line([wall.start, wall.end], human.coords);
                if geometry::is_lines_intersects(
                    vector_to_line
                        .normalize()
                        .product(9999.0)
                        .to_line(human.coords),
                    wall.to_line(),
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
                coords: [human.coords[0] + dr.x, human.coords[1] + dr.y],
                panic: if result_vector.get_length() > 800.0 {
                    100
                } else {
                    human.panic
                },
            });
        }

        self.humans = new_humans;
        JsValue::from_serde(&self).unwrap()
    }
}
