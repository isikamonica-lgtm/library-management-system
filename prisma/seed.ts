import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from ''../generated/prisma/client":

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  // Create the four book genres
  const genres = [
    { name: "Technology", description: "Computing, software and technology." },
    { name: "Fiction", description: "Creative stories and novels." },
    { name: "History", description: "Historical events and biographies." },
    { name: "Science", description: "Scientific knowledge and discoveries." },
  ];

  for (const genre of genres) {
    await prisma.genre.upsert({
      where: { name: genre.name },
      update: { description: genre.description },
      create: genre,
    });
  }

  // Book records distributed across the four genres
  const books = [
    { title: "Clean Code", author: "Robert C. Martin", isbn: "9780132350884", publicationYear: 2008, genreName: "Technology" },
    { title: "The Pragmatic Programmer", author: "Andrew Hunt", isbn: "9780135957059", publicationYear: 2019, genreName: "Technology" },
    { title: "Introduction to Algorithms", author: "Thomas H. Cormen", isbn: "9780262046305", publicationYear: 2022, genreName: "Technology" },
    { title: "The Phoenix Project", author: "Gene Kim", isbn: "9780988262591", publicationYear: 2013, genreName: "Technology" },

    { title: "Things Fall Apart", author: "Chinua Achebe", isbn: "9780385474542", publicationYear: 1958, genreName: "Fiction" },
    { title: "Purple Hibiscus", author: "Chimamanda Ngozi Adichie", isbn: "9781616202415", publicationYear: 2003, genreName: "Fiction" },
    { title: "The Alchemist", author: "Paulo Coelho", isbn: "9780061122415", publicationYear: 1988, genreName: "Fiction" },
    { title: "Half of a Yellow Sun", author: "Chimamanda Ngozi Adichie", isbn: "9780007200283", publicationYear: 2006, genreName: "Fiction" },

    { title: "A History of Kenya", author: "W. R. Ochieng", isbn: "9780435948112", publicationYear: 1985, genreName: "History" },
    { title: "The History of Africa", author: "Kevin Shillington", isbn: "9781138281480", publicationYear: 2018, genreName: "History" },
    { title: "Long Walk to Freedom", author: "Nelson Mandela", isbn: "9780316548182", publicationYear: 1994, genreName: "History" },
    { title: "The Diary of a Young Girl", author: "Anne Frank", isbn: "9780553296983", publicationYear: 1947, genreName: "History" },

    { title: "A Brief History of Time", author: "Stephen Hawking", isbn: "9780553380163", publicationYear: 1988, genreName: "Science" },
    { title: "The Selfish Gene", author: "Richard Dawkins", isbn: "9780198788607", publicationYear: 1976, genreName: "Science" },
    { title: "Cosmos", author: "Carl Sagan", isbn: "9780345539434", publicationYear: 1980, genreName: "Science" },
  ];

  for (const book of books) {
    const { genreName, ...bookData } = book;

    await prisma.book.upsert({
      where: { isbn: book.isbn },
      update: bookData,
      create: {
        ...bookData,
        genre: {
          connect: { name: genreName },
        },
      },
    });
  }

  console.log("Seeding completed: 4 genres and 15 books.");
}

main()
  .catch((error) => {
    console.error("Seeding failed:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });