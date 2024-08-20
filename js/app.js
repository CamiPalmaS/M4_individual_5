//funcion asincrona para recuperar info de la api
async function obtenerCategorias() {
    const url = 'https://www.themealdb.com/api/json/v1/1/categories.php';

    try {
        const response = await fetch(url);
        if (!response.ok) {//si la respuesta no salio bien (no fue dentro de los 200)
            throw new Error("Error al conectarse a la API");
        }

        //si vuelve ok, se guarda la respuesta (en json)
        const data = await response.json();
        //se llama funcion para mostrar la lista de categorias en el select
        mostrarCategorias(data.categories);
        //para enviar la data a la funcion que mostrara la info una vez se cambie el select
        mostrarInformacionCategoria(data.categories);
        
    } catch (error) {
        console.error("Hubo un problema con la solicitud: ", error);
    }
}

//llama a la función para obtener las categorías (para que se ejecute con la pag)
obtenerCategorias();

//para mostrar las categorías en el select
function mostrarCategorias(categorias) {
    //.sort para ordenar por nombre (.strCategory)
    categorias.sort((a, b) => a.strCategory.localeCompare(b.strCategory));

    //apuntar al select por ID
    const selectElement = document.getElementById("categorias");

    //para que recorra las categorias sobre las categorías
    categorias.forEach(categoria => {
        //para crear los elementos option para el select
        const option = document.createElement("option");
        //asignar valor (id) y titulo/nombre (strCategory)
        option.value = categoria.idCategory;
        option.textContent = categoria.strCategory;

        //para que se añadan las opciones
        selectElement.appendChild(option);
    });

    //para mostrar categorias en la consola
    categorias.forEach(categoria => {
        console.log(`ID: ${categoria.idCategory}, Categoría: ${categoria.strCategory}`);
        console.log(`Descripción: ${categoria.strCategoryDescription}`);
    });
}

function mostrarInformacionCategoria(categorias) {
    //apunta al select y el div donde se enviaran los resultados
    const selection = document.getElementById("categorias");
    const resultadoDiv = document.getElementById("resultado");

    //se indica que habra cambios cuando haya un "cambio" en el select
    selection.addEventListener("change", () => {
        //se recupera el valor dentro del select indicado al agregar el .value
        //no se hace antes porque se necesita el elemento select para indicar el onchange
        const option = selection.value;

        //compara valor del select con las categorias del array que se recupera del url
        const selectedCategoria = categorias.find(categoria => categoria.idCategory === option);

        //para mostrar la informacion de la categoria elegida en el div
        resultadoDiv.innerHTML = `
            <h3>${selectedCategoria.strCategory}</h3>
            <img src="${selectedCategoria.strCategoryThumb}" 
            alt="${selectedCategoria.strCategory}" class="img-fluid"><br>
            <p>${selectedCategoria.strCategoryDescription}</p>
        `;
        
    });
}
