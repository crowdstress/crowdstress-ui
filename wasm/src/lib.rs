#[path = "app.rs"]
mod app;
#[path = "utils/behaviour.rs"]
mod behaviour;
#[path = "config.rs"]
mod config;
#[path = "utils/geometry.rs"]
mod geometry;
#[path = "utils/human.rs"]
mod human;
#[path = "utils/object.rs"]
mod object;
#[path = "utils/physics.rs"]
mod physics;
#[path = "utils/primitives.rs"]
mod primitives;
#[path = "utils/vector.rs"]
mod vector;
#[path = "utils/wall.rs"]
mod wall;

#[macro_use]
extern crate serde_derive;
extern crate js_sys;
extern crate serde_json;
extern crate wasm_bindgen;

use crate::app::App;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn init(humans_array: &JsValue, objects_array: &JsValue) -> JsValue {
    let app = App::init(humans_array, objects_array);
    JsValue::from_serde(&app).unwrap()
}

#[wasm_bindgen]
pub fn tick(app_object: JsValue) -> JsValue {
    let mut app: App = app_object.into_serde().unwrap();
    app.tick()
}

// #[wasm_bindgen]
// pub fn run(humans_array: &JsValue, objects_array: &JsValue, render: &Function) {
//     let humans: Vec<Human> = humans_array.into_serde().unwrap();
//     let objects: Vec<DrawingObject> = objects_array.into_serde().unwrap();
//     let walls: Vec<Wall> = objects
//         .iter()
//         .map(|object| Wall::from_object(object))
//         .flatten()
//         .collect();
//     let exits: Vec<Section> = objects
//         .iter()
//         .filter(|object| object.object_type == 4)
//         .map(|object| [object.points[0], object.points[1]])
//         .collect();
//     let mut new_humans: Vec<Human> = Vec::new();
//
//     for human in &humans {
//         let mut human_vectors: Vec<Vector> = Vec::new();
//
//         let target = get_target(human, &exits);
//         human_vectors.push(f1(human, &target));
//
//         for wall in &walls {
//             let vector_to_line = geometry::get_vector_to_line([wall.start, wall.end], human.coords);
//             if geometry::is_lines_intersects(
//                 vector_to_line
//                     .normalize()
//                     .product(9999.0)
//                     .to_line(human.coords),
//                 wall.to_line(),
//             ) {
//                 human_vectors.push(f2w(vector_to_line));
//             }
//         }
//
//         for other_human in &humans {
//             let is_self = other_human as *const Human == human as *const Human;
//             if !is_self {
//                 let vector_to_human = Vector::from_points(&human.coords, &other_human.coords);
//                 human_vectors.push(f2(vector_to_human));
//             }
//         }
//
//         let mut result_vector: Vector = Vector::origin();
//
//         for vector in human_vectors {
//             result_vector = result_vector.add(&vector);
//         }
//
//         let a = result_vector.divide(HUMAN_MASS);
//         let dr = a.product(DELTA_T.powf(2.0) * SCALING_FACTOR);
//
//         new_humans.push(Human {
//             coords: [human.coords[0] + dr.x, human.coords[1] + dr.y],
//             panic: if result_vector.get_length() > 800.0 {
//                 100
//             } else {
//                 human.panic
//             },
//         });
//     }
//
//     render.call1(&JsValue::NULL, &JsValue::from_serde(&new_humans).unwrap());
// }

// #[wasm_bindgen]
// pub fn run2(human_object: &JsValue, objects_array: &JsValue, on_set_targets: &Function) -> JsValue {
//     let human: Human = human_object.into_serde().unwrap();
//     let objects: Vec<DrawingObject> = objects_array.into_serde().unwrap();
//     let exits: Vec<Section> = objects
//         .iter()
//         .filter(|object| object.object_type == 4)
//         .map(|object| [object.points[0], object.points[1]])
//         .collect();
//
//     let target = get_target(&human, &exits, &on_set_targets);
//
//     JsValue::from_serde(&target).unwrap()
// }

// fn f3w(vector_to_wall: Vector) -> Vector {
//     let v = Vector::new([10.0, 0.0]);
//     let n = vector_to_wall.normalize();
//     let t = n.perpendicular();
//     let distance_to_wall = vector_to_wall.get_length() - R;
//     let kn = n.product(K1);
//     let KVtt = t.product(K2 * v.dot(&t));
//     kn.add(&KVtt).product(distance_to_wall * heaviside(distance_to_wall))
// }
//
// fn heaviside(n: f64) -> f64 {
//     if n < 0.0 { 0.0 } else { 1.0 }
// }
