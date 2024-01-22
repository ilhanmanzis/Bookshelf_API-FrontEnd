 const container = document.querySelector('.container');
 const table = document.querySelector('table')


// delete books
const deleteBooks = async(id)=>{
    const confirmation = confirm('apakah yakin akan dihapus?');

    if(confirmation){
        try{
            const res = await axios.delete(`http://localhost:9000/books/${id}`);
            console.log(res);
            window.location.reload();
        }catch(err){
            console.log(err)
        }
    }
    else{
        console.log('gagal')
    }
}




const get = async()=>{
    try{
        const res = await axios.get('http://localhost:9000/books')
        console.log(res.data.data.books)
        if(res.data.data.books.length === 0){
            table.classList.add('hidden')
            const h1 = document.createElement('h1');
            container.classList.add('kosong')
            h1.innerText = 'Buku Kosong';
            container.append(h1)
        }
        else{
            getAllBooks(res.data.data.books);
        }
    }catch(err){
        console.log(err)
    }

}

const getAllBooks = (show)=>{
    table.classList.remove('hidden')
    container.classList.remove('kosong')
    let i = 1;
    for(let result of show){
        if(result){
            const id = result.id;
            const showBooks = document.createElement('a')
            showBooks.setAttribute('href', `getBooks/detail.html?id=${id}`);
            const editBooks = document.createElement('a')
            editBooks.setAttribute('href', `updateBooks/update.html?id=${id}`);
            const hapusBooks = document.createElement('a')
            hapusBooks.classList.add('cursor');
            hapusBooks.setAttribute('onclick', `deleteBooks('${id}')`);

            

            const tr = document.createElement('tr')
            tr.classList.add('books');

            const no =document.createElement('td')
            const name = document.createElement('td')
            const publis = document.createElement('td')
            const update = document.createElement('td');
            const hapus = document.createElement('td');
            const show = document.createElement('td');
            

            const judul = document.createElement('h4');
            const publisher = document.createElement('span');

            publisher.innerText = result.publisher;
            judul.innerText = result.name;
            no.innerText = i;
            name.append(judul)
            publis.append(publisher)

            const iconEdit = document.createElement('img')
            iconEdit.classList.add('img')
            iconEdit.src = 'asset/image/edit.png'
            const iconHapus = document.createElement('img')
            iconHapus.classList.add('img')
            iconHapus.src = 'asset/image/hapus.png'
            const iconShow = document.createElement('img')
            iconShow.classList.add('img')
            iconShow.src = 'asset/image/show.png'
            
            editBooks.append(iconEdit)
            hapusBooks.append(iconHapus)
            update.append(editBooks)
            hapus.append(hapusBooks)
            show.append(iconShow)
            tr.append(no);
            tr.append(name);
            tr.append(publis);
            tr.append(update);
            tr.append(hapus);
            showBooks.append(iconShow)
            show.append(showBooks);
            tr.append(show)
            table.append(tr)
            i++
        }
    }
}

get();