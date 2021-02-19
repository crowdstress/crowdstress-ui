use crowdstress_common::primitives::Point;

#[derive(Serialize, Deserialize)]
pub struct Human {
    pub coords: Point,
    pub panic: u8,
    pub passed_exits: Vec<String>,
}
