"use strict";

function MyError(name="Error generico",message = "Default Message") { //creo un objeto error generico del que heredarán los errores especificos
    this.name = name;
    this.message = message;
}
MyError.prototype = Object.create(Error.prototype);
MyError.prototype.constructor = MyError;

//Creo los distintos tipos de errores necesarios
let tituloVacio =new MyError("tituloVacio","El titulo no puede ser vacio");
let nullCategory =new MyError("nullCategory","La categoria no puede ser null");
let categoriaExistente = new MyError("categoria Existente","La categoria ya existe");
let categoriaNoRegistrada = new MyError("categoriaNoRegistrada","La categoria no esta registrada");
let imagenNull = new MyError("imagenNull","La imagen no puede ser null");
let imagenInexistente = new MyError("imagenInexistente","La imagen no existe");
let autorNull = new MyError("autorNull","El autor no puede ser nulo");
let autorInexistente = new MyError("autorInexistente","El autor no existe");
let urlVacia = new MyError("urlVacia","No se ha introducido URL");
let objetoMalConstruido = new MyError("objetoMalConstruido","Objeto mal construido");


//Constructor de Author
function Author(nickname, email, avatar){
    if(nickname===undefined || email===undefined){
        throw objetoMalConstruido;
    }
    this.nickname=nickname,
    this.email=email,
    this.avatar=avatar
    
}
//Getters ySetters de author
Object.defineProperty(Author, "nickname", {
    get: function() {
    return this.nickname;
    },
    set: function(value){
    this.nickname=value;
    }
    
});
Object.defineProperty(Author, "email", {
    get: function() {
    return this.email;
    },
    set: function(value){
    this.email=value;
    }
    
});

Object.defineProperty(Author, "avatar", {
    get: function() {
    return this.avatar;
    },
    set: function(value){
    this.avatar=value;
    }
    
});

//constructor de Image
function Image(title, description,url,coords){
    if(title===undefined){
        throw tituloVacio;
    }
    if(url===undefined){
        throw urlVacia;
    }
    this.title=title,
    this.description=description
    this.url=url,
    this.coords=coords
}
//Getters y Stters de Image
Object.defineProperty(Image, "title", {
    get: function() {
    return this.title;
    },
    set: function(value){
    this.title=value;
    }
    
});
Object.defineProperty(Image, "description", {
    get: function() {
    return this.description;
    },
    set: function(value){
    this.description=value;
    }
    
});

Object.defineProperty(Image, "url", {
    get: function() {
    return this.url;
    },
    set: function(value){
    this.url=value;
    }
    
});
Object.defineProperty(Image, "coords", {
    get: function() {
    return this.coords;
    },
    set: function(value){
    this.coords=value;
    }
    
});

//Creación de los constructores de objetos que heredan de Image
function Landscape(){

};
Landscape.prototype = Object.create(Image.prototype);
Landscape.prototype.constructor = Landscape;

function Portrait(){

};
Portrait.prototype = Object.create(Image.prototype);
Portrait.prototype.constructor = Portrait;

//Constructor de Category
function Category(title, description){
    this.title=title,
    this.description=description
}
//Getters y Setters de Category
Object.defineProperty(Category, "title", {
    get: function() {
    return this.title;
    },
    set: function(value){
    this.title=value;
    }
    
});
Object.defineProperty(Category, "description", {
    get: function() {
    return this.description;
    },
    set: function(value){
    this.description=value;
    }
    
});

//Constructor de Coords
function Coords(Latitude, Longitude){
    if(Latitude===undefined || Longitude===undefined){
        throw objetoMalConstruido;
    }
    this.latitude=Latitude,
    this.longitude=Longitude
}

//Getters y Setters de Coords
Object.defineProperty(Coords, "latitude", {
    get: function() {
    return this.latitude;
    },
    set: function(value){
    this.latitude=value;
    }
    
});

Object.defineProperty(Coords, "longitude", {
    get: function() {
    return this.longitude;
    },
    set: function(value){
    this.longitude=value;
    }
    
});

//Constructor de Gallery
function Gallery(titulo,defaultCategory,defaultAuthor){
    if(titulo===undefined){
        throw tituloVacio;
    }
    this.title =titulo,
    this.images=[],
    this.categories=[],
    this.authors=[],
    this.defaultCategory=defaultCategory,
    this.defaultAuthor=defaultAuthor
};

//Getters y Setters de Gallery
Object.defineProperty(Gallery, "title", {
    get: function() {
    return this.titulo;
    },
    set: function(value){
    if(value===""){
        throw tituloVacio;
    }
    this.titulo=value;
    }
    
});

Object.defineProperty(Gallery, "categories", {
    get: function() {
    return this.categories;
    }
    
});

Object.defineProperty(Gallery, "authors", {
    get: function() {
    return this.authors;
    }
    
});

//Metodos de Gallery
Gallery.prototype.addCategory = function(categoria){
    if(categoria===null){
        throw nullCategory;
    }
    this.categories.forEach(function(element){
        if(element.category===categoria){
            throw categoriaExistente;
        }
    });

    
    this.categories.push({
        category: categoria,
        images: []
    });
    return this.categories.length;
};
Gallery.prototype.removeCategory = function(categoria){
    let aux=false;
    this.categories.forEach(function(element){
        if(element.category===categoria){
            aux=true;
        }
    });
    if(!aux){
        throw categoriaNoRegistrada;
    }

    this.categories.forEach(function(element, index,array){
        if(element===categoria){
            array.splice(index,1);
            
        }
    });
    return this.categories.length;
};

Gallery.prototype.addImage = function(image, category, author){

    if(image===null){
        throw imagenNull;
    }

    let aux = false;
    let index = 0;
    this.images.push({
        image: image,
        author: author.nickname
    });

    this.categories.forEach(function(element,indice){
        if(element.category===category){
            aux=true;
            index = indice;
        }
    });

    if(!aux){
        this.categories.push({
            category: category,
            images: [image]
        });
    }else{
        this.categories[index].images.push(image);
    }

    if(!this.authors.includes(author)){
        this.authors.push(author);
    }
    return this.images.length;
}

Gallery.prototype.removeImage=function(image){

    let aux = false;

    this.images.forEach(function(element, index,array){
        if(element.image===image){
            aux=true;
            array.splice(index,1);
            
        }
    });

    if(!aux){
        throw imagenInexistente;
    }

    return this.images.length;
}

Gallery.prototype.getCategoryImages = function(category){
    if(category===null){
        throw nullCategory;
    }

    let aux=-1;
    this.categories.forEach(function(element, index,array){
        console.log("prueba:"+index);
        if(element.category===category){
            console.log("prueba"+index);
            aux = index;
            
            
        }
    });
    if(aux!=-1){
        return this.categories[aux].images;
    }else{
        return "Categoria no encontrada";
    }
}

Gallery.prototype.addAuthor = function(autor){
    if(autor===null){
        throw autorNull;
    }
    if(!this.authors.includes(autor)){
        this.authors.push(autor);
    }
    return this.authors.length;
}

Gallery.prototype.removeAuthor = function(autor){

    let aux=false;

    this.authors.forEach(function(elemento, index, array){
        if(elemento===autor){
            aux=true;
            array.splice(index,1);
        }
    });
    if(!aux){
        throw autorInexistente;
    }
    return this.authors.length;
}

Gallery.prototype.getAuthorImages = function(autor){

    if(autor===null){
        throw autorNull;
    }

    let aux =[];

    this.images.forEach(function(element){
        if(element.author===autor.nickname){
            aux.push(element);
        }
    });
    return aux;
};

Gallery.prototype.getPortraits = function(){
    let aux =[];

    this.images.forEach(function(element){
        if(element.image instanceof Portrait){
            aux.push(element);
        }
    });
    return aux;
}

Gallery.prototype.getLandscapes = function(){
    let aux =[];

    this.images.forEach(function(element){
        if(element.image instanceof Landscape){
            aux.push(element);
        }
    });
    return aux;
}


//Funcion para realizar las pruebs de funcionamiento
function pruebas(){
    
    let galeria = new Gallery("g1","c1","a1");
    /*
    console.log(galeria.title);
    galeria.title="g2";
    console.log(galeria.title);
    console.log(galeria.categories);
    console.log(galeria.authors);
    console.log(galeria.addCategory(1));
    console.log(galeria.categories);
    console.log(galeria.removeCategory(1));
    console.log(galeria.categories);
    
  // let categoria = new Category("cat","descripcion");
   console.log(categoria.title);
   console.log(categoria.description);
   categoria.title="cat2";
   categoria.description="desc2";
   console.log(categoria.title);
   console.log(categoria.description);
   */

   let image1 = new Image("Imagen1","muy bonita","gsgsdg","sdfs");
   let image2 = new Image("Imagen2","preciosa","gsgsdg","sdfs");
   let autor = new Author("Paco","correo","avatar");
   let autor2 = new Author("Pepo","correo","avatar");
   let autor3 = new Author("Jimmy","correo","avatar");
   let categoria = new Category("cat","descripcion");
   let categoria2 = new Category("cat2","descripcion2");
   let categoria3 = new Category("cat3","descripcion2");

   
   console.log(galeria.addImage(image1,categoria,autor));
   console.log(galeria.images);
   console.log(galeria.categories);
   console.log(galeria.authors);
   console.log(galeria.images[0].image.title);
   console.log(galeria.addImage(image2,categoria2,autor2));
   console.log(galeria.images[1]);
   console.log(galeria.categories);
   console.log(galeria.authors);


   console.log(galeria.removeImage(image1));
   console.log(galeria.images);

   console.log(galeria.addImage(image2,categoria,autor2));
   
   console.log(galeria.getCategoryImages(categoria));

   console.log(galeria.addAuthor(autor3));

   console.log(galeria.authors);
   console.log(galeria.removeAuthor(autor3));
   console.log(galeria.authors);

   
   console.log(galeria.getAuthorImages(autor2));


   let retrato = new Portrait("Retrato","muy bonita","gsgsdg","sdfs");
   let escapetierraXD = new Landscape("Escapetierraoloquesea","preciosa","gsgsdg","sdfs");
   console.log(galeria.addImage(retrato,categoria,autor2));
   console.log(galeria.addImage(escapetierraXD,categoria,autor2));
   console.log(galeria.getPortraits());
   console.log(galeria.getLandscapes());

   //probando excepciones
   try {
       let galeria2 = new Gallery();
       
   } catch (error) {
       console.log(error.message);
   }

   try{
    galeria.addCategory(null);
   } catch(error){
    console.log(error.message);

   }
    
   try{
    galeria.addCategory(categoria);
    
   } catch(error){
    console.log(error.message);

   }

   try{
    galeria.removeCategory(categoria3);
    
   } catch(error){
    console.log(error.message);

   }
    
   try{
    galeria.addImage(null);
    
   } catch(error){
    console.log(error.message);

   }

   try{
    galeria.removeImage();
    
   } catch(error){
    console.log(error.message);

   }


}

pruebas();
   