const url = new URLSearchParams(window.location.search);
const bookId = url.get('id');

const form = document.querySelector('#tambah-buku')
const p = document.querySelector('p')
const button = document.querySelector('#button');

// <!-- name, year, author, summary, publisher, pageCount, readPage, reading, -->

const update = async()=>{
    const name = form.elements.name.value;
    const year = form.elements.year.value;
    const author = form.elements.author.value;
    const summary = form.elements.summary.value;
    const publisher = form.elements.publisher.value;
    const page = form.elements.page.value;
    const readPage = form.elements.readPage.value;
    const reading = form.elements.reading.value;
    
    if(name.trim()==='' || year.trim()==='' || author.trim()==='' || summary.trim()==='' || publisher.trim()==='' || page.trim()==='' || readPage.trim()==='' || reading.trim()===''){
        p.classList.add('error')
        p.innerText='*Masukan data yang diperlukan';
        return;
    }
    try{
        const bookData = {
            name: name,
            year: year,
            author: author,
            summary: summary,
            publisher: publisher,
            pageCount: page,
            readPage: readPage,
            reading: reading
        }
    
        const res = await axios.put(`http://localhost:9000/books/${bookId}`, bookData, {
            headers:{
                'Content-Type': 'application/json'
            }
        });
        console.log(res)
        window.location.href = '../index.html'
    }catch(err){
        console.log(err)
    }
    
}


const validasi = async()=>{
    const valid = await axios.get(`http://localhost:9000/books/${bookId}`);
    const getValid = await axios.get('http://localhost:9000/books')
    console.log(valid.data.data.book)
    const isSuccess = getValid.data.data.books.filter((book)=>book.id === bookId).length > 0;
    if(!isSuccess){
        const notFound = document.createElement('h1');
        notFound.innerText = 'NOT FOUND'
        document.querySelector('body').append(notFound);
        return;
    }

    form.elements.name.value = valid.data.data.book.name;
    form.elements.year.value = valid.data.data.book.year;
    form.elements.author.value = valid.data.data.book.author;
    form.elements.summary.value = valid.data.data.book.summary
    form.elements.publisher.value = valid.data.data.book.publisher;
    form.elements.page.value = valid.data.data.book.pageCount;
    form.elements.readPage.value = valid.data.data.book.readPage;
    form.elements.reading.value = valid.data.data.book.reading;
    
    button.addEventListener('click', update)
}


validasi();




