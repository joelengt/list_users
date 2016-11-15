(function () {

    // Clase Usuario
    class Usuario {
        // Atributos
        constructor(id, name, last_name, address, cellphone, telephone, avatar) {
            this.id = id;
            this.name = name;
            this.last_name = last_name;
            this.address = address;
            this.cellphone = cellphone;
            this.telephone = telephone;
            this.avatar = avatar;
        }

        // Metodos

        // Construir Template de Usuario
        buildUserTemplate() {
            // Template de Usuario
            let template_user_item = `<tr class="itemUser" data-id="${ this.id }">
                                        <td>${ this.id }</td>
                                        <td>${ this.name }</td>
                                        <td>${ this.last_name }</td>
                                        <td>${ this.address }</td>
                                        <td>${ this.cellphone }</td>
                                        <td>${ this.telephone }</td>
                                        <td><img class="imagenAvatar" src='./images/${ this.avatar }' alt="${ this.name } ${ this.last_name }"height="40"></td>
                                      </tr>`;
            return template_user_item
        }

        // Render Template
        setUserTemplate(contentHtml) {
            contentHtml.innerHTML+= this.buildUserTemplate();
        }
    }

    // Obtener usuario como objeto
    function getUser (element){
        let nuevoUsuario = new Usuario(element.id, element.name, element.last_name, element.address, element.cellphone, element.telephone, element.avatar);
        return nuevoUsuario
    }

    // Recorriendo lista obtenida
    function runList(array, limitStart, limitEnd, contentHtml) {
        // Evento ciclo
        for(var i = limitStart; i <= limitEnd; i++) {
            var elemento_usuario = array[i];

            // Creando nuevo usuario
            let nuevoUsuario = getUser(elemento_usuario);

            // Pegar template de usuario en el html
            nuevoUsuario.setUserTemplate(contentHtml);
        }
    }

    // READ Todos los Usuarios
    function readUsers(limitEachPage, contentHtml) {
        // GET :: READ Lista de usuarios
        $.ajax({
            url: '/dashboard/usuarios-list/list/0',
            method: 'get',
            success: function (listUsuarios) {

                contentHtml.innerHTML = '';
                getPaginationTemplate(limitEachPage, listUsuarios.result.length);
                var valueInit = 0;
                var valueEnd = 9;

                // Recorre lista y render Template en html
                runList(listUsuarios.result, valueInit, valueEnd, contentHtml);

            }
        })  
    }

    // READ Usuario por id
    function readUserById(user_id, contentHtml) {
        // GET :: READ Lista de usuarios
        $.ajax({
            url: `/dashboard/usuarios-list/item/0/${ user_id }`,
            method: 'get',
            success: function (usuario) {

                // Recorre lista y render Template en html
                let nuevoUser = getUser(usuario.result);

                contentHtml.innerHTML = nuevoUser.buildUserTemplate();

            }
        }) 
    }
    
    // Filtrando usuario por nombre
    function searchByName(nameUser, contentHtml) {
        let listUserFound = [];
        $.ajax({
            url: '/dashboard/usuarios-list/list/0',
            method: 'get',
            success: function (listUsuarios) {
                console.log('Lista obtenida');
                console.log(listUsuarios);

                console.log('Comparando el .name con ' + nameUser);

                contentHtml.innerHTML = '';

                // Recorre lista y render Template en html
                for(var j = 0; j <= listUsuarios.result.length - 1; j++) {
                    var elementoUser = listUsuarios.result[j]
                    var wordSolicitada = elementoUser.name.toLowerCase();
                    nameUser = nameUser.toLowerCase()
                    var coincidenciaMinima = 0;

                    // Buscando coindicencia de la palabra
                    for(var m = 0; m <= wordSolicitada.length - 1; m++) {
                        if(wordSolicitada[m] !== nameUser[m]) {
                              console.log('Ya no coincide')
                              break
                        }

                        console.log(m)

                        coincidenciaMinima++;
                        
                    }

                    if(coincidenciaMinima === nameUser.length) {
                        listUserFound.push(elementoUser);
                    }
  
                }

                console.log('Resultado del filtrado');
                console.log(listUserFound);

                // Render de kas coincidencias
                if(listUserFound.length === 0) {
                    contentHtml.innerHTML = '<tr>No se encontraron elementos con ese nombre</tr>';
                    
                } else {
                    contentHtml.innerHTML = '';

                    runList(listUserFound, 0, listUserFound.length - 1, contentHtml)
                }

            }
        })

    }

    // Obtener Render de Paginacion
    function getPaginationTemplate(limitEachPage, listUsuariosLength) {
        console.log('Impriminedo lista');

        // Obteniendo Template de Paginacion
        var listCantidad = listUsuariosLength;
        console.log('Cantidad: ' + listCantidad);
        var numberPages =  listCantidad/limitEachPage;
        var residuo = listCantidad%limitEachPage;

        var $boxPagination = document.querySelector('.PaginationContent');

        if(residuo > 0 && residuo < 10) {
            console.log('Tiene residuo');
            numberPages = numberPages + 1;
        }

        $boxPagination.innerHTML = '';

        console.log('Pagina a imprimir: ' + numberPages);

        // Generar Template con limites
        for(var g = 1; g <= numberPages; g++) {
            let value_init;
            let value_end;

            if(listCantidad >= 10) {
                console.log('aaa');
                value_init = (g - 1) * limitEachPage;
                value_end = (g * limitEachPage) - 1;

                listCantidad = listCantidad - 10;

            } else {
                console.log('nn');
                value_init = (g - 1) * limitEachPage;
                value_end = (g * limitEachPage) + residuo;
                listCantidad = listCantidad - residuo;
            }

            $boxPagination.innerHTML += `<li class="selectPage" data-init="${ value_init }" data-end="${ value_end }">${ g }</li>`
        }


    }

    // Cambiar orden de columna
    function changePosition(htmlContentItems) {
        console.log('Click');
        let ContentItems = document.querySelectorAll('.itemUser');

        console.log(ContentItems);

        console.log('--------------------');
        
        htmlContentItems.innerHTML = '';

        for (var i = ContentItems.length - 1; i >= 0; i--) {
            let $item = ContentItems[i];
            console.log($item.outerHTML);

            htmlContentItems.innerHTML += $item.outerHTML;

        }

        console.log('--------------------');

    }
    // Modal de image
    function showModalImage(imagePath, imageAlt) {
        console.log('Imagen path');
        console.log(imagePath);

       // Get the modal
       var modal = document.getElementById('myModal');

       // Get the image and insert it inside the modal - use its "alt" text as a caption
       var modalImg = document.getElementById("img01");
       var captionText = document.getElementById("caption");

       modal.style.display = "block";
       modalImg.src = imagePath;
       captionText.innerHTML = imageAlt;

       // Get the <span> element that closes the modal
       var span = document.getElementsByClassName("close")[0];

       // When the user clicks on <span> (x), close the modal
       span.onclick = function() { 
         modal.style.display = "none";
       }


    }

    // Nav Fixed and scroll event
    function ScrollNav() {
        window.onscroll = changePos;

        function changePos() {
            var header = document.getElementById("header");
            //var item_here = document.querySelector(".header__item");

            if (window.pageYOffset > 90) {
                header.style.position = "absolute";
                header.style.top = pageYOffset + "px";
                header.style.margin = "1rem";
                //$(".header__item").css('background','red');
                //$(".header__item").css('padding','0rem 2rem');


            } else {
                header.style.position = "";
                header.style.top = "";
            }
        }
    }

    // Funcion Principal
    function main() {
        // Obteniendo Contenedo html
        var $boxConntentHtml = document.querySelector('#boxListUsers');
        var $ArticlesContainer = $('#App_Container').find('.Articles_containers');
        var $ArticlesContainerPages = $('#App_Container').find('.Pagination');


        var $txtBoxSearchByName = document.querySelector('#txt_box_search');
        var $btnBoxSearchByName = document.querySelector('#btn_box_search');
        var nameUserWord = '';

        var $btn_change_order = document.querySelector('.btn_change_order');

         // Paginacion
        var limitePage = 10;

        $boxConntentHtml.innerHTML = 'Cargando ...';

        // Lectura de Usuarios
        readUsers(limitePage, $boxConntentHtml);

        // Filtro por caja de texto by name - Por coincidencia de parte de la palabra
       $btnBoxSearchByName.addEventListener('click', function (ev) {
            let nameUser = $txtBoxSearchByName.value;
            searchByName(nameUser, $boxConntentHtml);
       })

       // Filtro por evento key: enter
       $txtBoxSearchByName.addEventListener('keypress', function (event) {
            let nameUser = $txtBoxSearchByName.value;
            if(event.charCode === 13) {
                searchByName(nameUser, $boxConntentHtml);
            }

       })

       $btn_change_order.addEventListener('click', function () {
            console.log('hi');

            changePosition($boxConntentHtml)

       })

       // Filter mientras la caja de texto cambia
       $('#txt_box_search').bind('input', function() { 
            if($(this).val() === '') {
               nameUserWord = '';
               readUsers($boxConntentHtml)
           }

           nameUserWord = $(this).val()
           searchByName(nameUserWord, $boxConntentHtml);
       });      
       
       // Filtro por evento key: enter
       $ArticlesContainerPages.on('click', '.selectPage', function (ev) {
            let $this = $(this)
            console.log(this);

            let $article = $this.closest('.selectPage');
            let dataInit = $article.data('init');
            let dataEnd = $article.data('end');

            console.log('Page');
            console.log(dataInit);
            console.log(dataEnd);

            $.ajax({
                url: '/dashboard/usuarios-list/list/0',
                method: 'get',
                success: function (listUsuarios) {

                    // Reset html
                    $boxConntentHtml.innerHTML = '';
                    
                    // Recorre lista y render Template en html
                    runList(listUsuarios.result, dataInit, dataEnd, $boxConntentHtml);

                }
            })  

        })

       $ArticlesContainer.on('click', '.imagenAvatar', function (ev) {
        console.log('Click');
            var imageUrl = this.src
            var imageAlt = this.alt
            showModalImage(imageUrl, imageAlt);

        })

        ScrollNav()

    }

    // Inicializando Lectura
    window.addEventListener('load', main);

})();
