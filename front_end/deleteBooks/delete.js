const deleteBooks = async(bookId)=>{
    const confirmation = confirm('apakah yakin akan dihapus?');

    if(confirmation){
        try{
            const res = await axios.delete(`http://localhost:9000/${bookId}`);
            console.log(res);
        }catch(err){
            console.log(err)
        }
    }
    else{
        console.log('gagal')
    }
}

module.export = deleteBooks;