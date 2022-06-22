pub mod ecosystem;

pub use ecosystem::AssociativeEcosystem;

// use std::collections::{HashMap, hash_map::DefaultHasher};
// use std::hash::{Hash, Hasher};

// use crate::shared::cell;


// fn calculate_hash<T>(t: &T) -> u64 where T: Hash {
//     let mut s = DefaultHasher::new();
//     t.hash(&mut s);
//     s.finish()
// }


// #[test]
// fn demo (){
//     let mut book_reviews = HashMap::new();

//     let position = cell::new( 25,25);
//     let same_position = cell::new( 25,25);

//     book_reviews.insert( position ,"a");
//     book_reviews.insert( position ,"dbab");

//     let val = book_reviews.get(&same_position).unwrap();


//     print!("the value saved : {}\n", &val);

//     print!("get hash : {} ", calculate_hash(&same_position));
    
// }
