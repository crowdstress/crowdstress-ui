use crate::primitives::{Point, Section};
use crate::vector::Vector;

pub fn get_section_middle(section: &Section) -> Point {
    [
        (section[0][0] + section[1][0]) / 2.0,
        (section[0][1] + section[1][1]) / 2.0,
    ]
}

pub fn get_vector_to_line(line: Section, point: Point) -> Vector {
    let n = Vector::from_points(&line[0], &line[1]).normalize();
    let a = Vector::new(line[0]);
    let p = Vector::new(point);
    let p2a = a.subtract(&p);
    let projection = p2a.dot(&n);
    let projection_vector = n.product(projection);
    if p2a.is_equal_to(&projection_vector) {
        Vector::origin()
    } else {
        p2a.subtract(&projection_vector)
    }
}

pub fn is_lines_intersects(line1: Section, line2: Section) -> bool {
    let vector1 = (line2[1][0] - line2[0][0]) * (line1[0][1] - line2[0][1])
        - (line2[1][1] - line2[0][1]) * (line1[0][0] - line2[0][0]);
    let vector2 = (line2[1][0] - line2[0][0]) * (line1[1][1] - line2[0][1])
        - (line2[1][1] - line2[0][1]) * (line1[1][0] - line2[0][0]);
    let vector3 = (line1[1][0] - line1[0][0]) * (line2[0][1] - line1[0][1])
        - (line1[1][1] - line1[0][1]) * (line2[0][0] - line1[0][0]);
    let vector4 = (line1[1][0] - line1[0][0]) * (line2[1][1] - line1[0][1])
        - (line1[1][1] - line1[0][1]) * (line2[1][0] - line1[0][0]);
    vector1 * vector2 <= 0.0 && vector3 * vector4 <= 0.0
}

pub fn is_point_belongs_to_line(line: Section, point: Point) -> bool {
    let mp1 = Vector::from_points(&point, &line[0]);
    let mp2 = Vector::from_points(&point, &line[1]);
    let dot = mp1.dot(&mp2);
    let distance = get_vector_to_line(line, point).get_length();
    dot <= 0.0 && distance <= 1.0
}
