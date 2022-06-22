use std::time::Duration;

use criterion::{criterion_group, criterion_main, Criterion};
use engine::{self};

fn basic_ecosystem_bench() -> engine::basic::Ecosystem {
    let mut ecosystem = engine::basic::Ecosystem::new(200, 200);

    ecosystem.bless(2, 0);
    ecosystem.bless(2, 1);
    ecosystem.bless(2, 2);

    ecosystem.bless(1, 2);
    ecosystem.bless(0, 1);

    ecosystem
}

fn associative_ecosystem_bench() -> engine::associative::AssociativeEcosystem {
    let mut ecosystem = engine::associative::AssociativeEcosystem::new();

    ecosystem.bless(2, 0);
    ecosystem.bless(2, 1);
    ecosystem.bless(2, 2);

    ecosystem.bless(1, 2);
    ecosystem.bless(0, 1);

    ecosystem
}

fn criterion_benchmark(c: &mut Criterion) {
    let mut associative_ecosystem = associative_ecosystem_bench();
    let mut basic_ecosystem = basic_ecosystem_bench();

    let mut group = c.benchmark_group("sample-size-example");

    group.measurement_time(Duration::new(30 , 10));
    group.sample_size(2000);

    group.bench_function("basic ecosystem benchmark no living cell", |b| {
        b.iter(|| basic_ecosystem.tick())
    });

    group.bench_function("associative ecosystem benchmark no living cell", |b| {
        b.iter(|| associative_ecosystem.tick())
    });


}

criterion_group!(benches, criterion_benchmark);
criterion_main!(benches);
