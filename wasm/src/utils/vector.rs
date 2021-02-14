use crate::primitives::{Point, Section};
use js_sys::Math::{acos, sqrt};

#[derive(Serialize, Deserialize, Copy, Clone)]
pub struct Vector {
    pub x: f64,
    pub y: f64,
}

impl Vector {
    pub fn origin() -> Vector {
        Vector { x: 0.0, y: 0.0 }
    }

    pub fn new(point: Point) -> Vector {
        Vector {
            x: point[0],
            y: point[1],
        }
    }

    pub fn from_points(start: &Point, end: &Point) -> Vector {
        Vector::new([end[0] - start[0], end[1] - start[1]])
    }

    pub fn to_line(&self, from: Point) -> Section {
        [from, [from[0] + self.x, from[1] + self.y]]
    }

    pub fn get_length(&self) -> f64 {
        sqrt(self.x.powf(2.0) + self.y.powf(2.0))
    }

    pub fn add(&self, vector: &Vector) -> Vector {
        add(self, vector)
    }

    pub fn divide(&self, n: f64) -> Vector {
        divide(self, n)
    }

    pub fn dot(&self, vector: &Vector) -> f64 {
        dot(self, vector)
    }

    pub fn is_collinear_with(&self, vector: &Vector) -> bool {
        is_collinear(self, vector)
    }

    pub fn is_equal_to(&self, vector: &Vector) -> bool {
        is_equal(self, vector)
    }

    pub fn normalize(&self) -> Vector {
        normalize(self)
    }

    pub fn perpendicular(&self) -> Vector {
        perpendicular(self)
    }

    pub fn product(&self, n: f64) -> Vector {
        product(self, n)
    }

    pub fn projection_to(&self, vector: &Vector) -> f64 {
        projection(self, vector)
    }

    pub fn scalar(&self, vector: &Vector) -> f64 {
        scalar(self, vector)
    }

    pub fn subtract(&self, vector: &Vector) -> Vector {
        subtract(self, vector)
    }
}

fn add(a: &Vector, b: &Vector) -> Vector {
    Vector::new([a.x + b.x, a.y + b.y])
}

fn angle(a: &Vector, b: &Vector) -> f64 {
    if a.get_length() * b.get_length() == 0.0 {
        0 as f64
    } else {
        acos(Vector::dot(a, b) / (a.get_length() * b.get_length()))
    }
}

fn divide(a: &Vector, n: f64) -> Vector {
    Vector::new([a.x / n, a.y / n])
}

fn dot(a: &Vector, b: &Vector) -> f64 {
    a.x * b.x + a.y * b.y
}

fn is_collinear(a: &Vector, b: &Vector) -> bool {
    a.x * b.y - a.y * b.x == 0.0
}

fn is_equal(a: &Vector, b: &Vector) -> bool {
    if a.x == b.x && a.y == b.y {
        true
    } else {
        false
    }
}

fn normalize(a: &Vector) -> Vector {
    if a.get_length() == 0.0 {
        Vector::origin()
    } else {
        Vector::new([a.x / a.get_length(), a.y / a.get_length()])
    }
}

fn perpendicular(vector: &Vector) -> Vector {
    Vector::new([-vector.y, vector.x])
}

fn product(a: &Vector, n: f64) -> Vector {
    Vector::new([a.x * n, a.y * n])
}

fn projection(a: &Vector, b: &Vector) -> f64 {
    scalar(a, b) / b.get_length()
}

fn scalar(a: &Vector, b: &Vector) -> f64 {
    a.get_length() * b.get_length() / angle(a, b).cos()
}

fn subtract(a: &Vector, b: &Vector) -> Vector {
    Vector::new([a.x - b.x, a.y - b.y])
}
