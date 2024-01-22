

const form = document.querySelector('#tambah-buku')
const p = document.querySelector('p')
const button = document.querySelector('#button');


const post = async()=>{
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
    
        const res = await axios.post('http://localhost:9000/books', bookData, {
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

button.addEventListener('click', post)