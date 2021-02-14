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
