import React from "react";
import Book from "../../models/Book";
import BookProps from "./components/BookProps";
const List: React.FC=() =>{
    const books: Book[]= [
        {
            id: 1,
            title: 'Book 1',
            description: 'Description for Book 1',
            originalPrice: 50000,
            price: 45000,
            imageUrl: './../../../image/books/1.jpg'
        },
        {
            id: 2,
            title: 'Book 2',
            description: 'Description for Book 2',
            originalPrice: 50000,
            price: 45000,
            imageUrl: './../../../image/books/2.jpg'
        },
        {
            id: 3,
            title: 'Book 3',
            description: 'Description for Book 3',
            originalPrice: 50000,
            price: 45000,
            imageUrl: './../../../image/books/3.jpg'
        },
        {
            id: 1,
            title: 'Book 1',
            description: 'Description for Book 1',
            originalPrice: 50000,
            price: 45000,
            imageUrl: './../../../image/books/1.jpg'
        },
        {
            id: 2,
            title: 'Book 2',
            description: 'Description for Book 2',
            originalPrice: 50000,
            price: 45000,
            imageUrl: './../../../image/books/2.jpg'
        },
        {
            id: 3,
            title: 'Book 3',
            description: 'Description for Book 3',
            originalPrice: 50000,
            price: 45000,
            imageUrl: './../../../image/books/3.jpg'
        },
        {
            id: 1,
            title: 'Book 1',
            description: 'Description for Book 1',
            originalPrice: 50000,
            price: 45000,
            imageUrl: './../../../image/books/1.jpg'
        },
        {
            id: 2,
            title: 'Book 2',
            description: 'Description for Book 2',
            originalPrice: 50000,
            price: 45000,
            imageUrl: './../../../image/books/2.jpg'
        },
        {
            id: 3,
            title: 'Book 3',
            description: 'Description for Book 3',
            originalPrice: 50000,
            price: 45000,
            imageUrl: './../../../image/books/3.jpg'
        },
        {
            id: 1,
            title: 'Book 1',
            description: 'Description for Book 1',
            originalPrice: 50000,
            price: 45000,
            imageUrl: './../../../image/books/1.jpg'
        },
        {
            id: 2,
            title: 'Book 2',
            description: 'Description for Book 2',
            originalPrice: 50000,
            price: 45000,
            imageUrl: './../../../image/books/2.jpg'
        },
        {
            id: 3,
            title: 'Book 3',
            description: 'Description for Book 3',
            originalPrice: 50000,
            price: 45000,
            imageUrl: './../../../image/books/3.jpg'
        }
        
    ];
    return(
        <div className="container">
            <div className="row mt-4">
                
                {
                    books.map((book)=>
                        <BookProps key={book.id} book={book}/>
                    )
                }
            </div>
        </div>
    );
}
export default List