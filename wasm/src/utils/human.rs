use crate::primitives::Point;

#[derive(Serialize, Deserialize)]
pub struct Human {
    pub coords: Point,
    pub panic: u8,
}
