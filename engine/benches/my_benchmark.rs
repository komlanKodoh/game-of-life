use criterion::{ criterion_group, criterion_main, Criterion};
use engine;

fn basic_ecosystem_bench() {
    let mut ecosystem = engine::basic::Universe::new(1000, 1000);

    for _ in 0..2 {
        ecosystem.tick()
    }
}

fn criterion_benchmark(c: &mut Criterion) {
    c.bench_function("basic ecosystem benchmark no living cell", |b| b.iter(|| basic_ecosystem_bench()));
}

criterion_group!(benches, criterion_benchmark);
criterion_main!(benches);
