const url = new URLSearchParams(window.location.search);
const bookId = url.get('id');
const header = document.querySelector('h1');


const get = async()=>{
    const valid = await axios.get('http://localhost:9000/books');
    console.log(valid.data.data.books)
    const isSuccess = valid.data.data.books.filter((book)=>book.id === bookId).length > 0;
    if(!isSuccess){
        document.querySelector('.container').remove();
        header.innerText='NOT FOUND';
    }
    else{
        const res = await axios.get(`http://localhost:9000/books/${bookId}`);
        console.log(res.status);
        getAllBooks(res.data.data.book);
    }
}

const getAllBooks = (show)=>{
    document.querySelector('title').innerText=show.name;
    header.innerText=show.name;
    const table = document.querySelectorAll('table');
    const tr = document.createElement('tr');
    tr.classList.add('tr1')
    const tr1 = document.createElement('tr');
    tr1.classList.add('tr1')
    const id = document.createElement('td');
    id.innerText=show.id;
    const name = document.createElement('td');
    name.innerText=show.name;
    const year = document.createElement('td');
    year.innerText = show.year;
    const author = document.createElement('td');
    author.innerText=show.author;
    const summary = document.createElement('td');
    summary.innerText=show.summary;
    const publisher = document.createElement('td');
    publisher.innerText=show.publisher
    const page = document.createElement('td');
    page.innerText=show.pageCount;
    const readPage = document.createElement('td');
    readPage.innerText=show.readPage;
    const finished = document.createElement('td');
    finished.innerText=show.finished;
    const reading = document.createElement('td');
    reading.innerText=show.reading;
    const insert = document.createElement('td');
    insert.innerText=show.insertedAt;
    const update = document.createElement('td');
    update.innerText=show.updatedAt;
    tr.append(id);
    tr.append(name);
    tr.append(year);
    tr.append(author);
    tr.append(summary);
    tr.append(publisher);
    table[0].append(tr)
    tr1.append(page);
    tr1.append(readPage);
    tr1.append(finished);
    tr1.append(reading);
    tr1.append(insert);
    tr1.append(update);
    table[1].append(tr1)

}

get();
