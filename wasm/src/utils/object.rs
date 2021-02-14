use crate::primitives::Point;

#[derive(Serialize, Deserialize)]
pub struct DrawingObject {
    pub object_type: u8,
    pub points: Vec<Point>,
}
