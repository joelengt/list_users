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
                                        <td><img src='./images/${ this.avatar }' height="40"></td>
                                        <td class="itemUserDelete">X</td>
                                        <td class="itemUserUpdate">U</td>
                                      </tr>`;
            return template_user_item
        }

        // Render Template
        setUserTemplate(contentHtml) {
            contentHtml.innerHTML+= this.buildUserTemplate();
        }
    }

    function getUser (element){
        let nuevoUsuario = new Usuario(element.id, element.name, element.last_name, element.address, element.cellphone, element.telephone, element.avatar);
        return nuevoUsuario
    }

    // Recorriendo lista obtenida
    function runList(array, contentHtml) {
        // Evento ciclo
        for(var i = 0; i <= array.length - 1; i++) {
            var elemento_usuario = array[i];

            // Creando nuevo usuario
            let nuevoUsuario = getUser(elemento_usuario);

            // Pegar template de usuario en el html
            nuevoUsuario.setUserTemplate(contentHtml);
        }
    }

    // READ Todos los Usuarios
    function readUsers(contentHtml) {
        // GET :: READ Lista de usuarios
        $.ajax({
            url: '/dashboard/usuarios-list/list/0',
            method: 'get',
            success: function (listUsuarios) {

                // Recorre lista y render Template en html
                runList(listUsuarios.result, contentHtml);

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

    // DELETE Usuario por id
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

                // Recorre lista y render Template en html
                listUserFound = listUsuarios.result.filter(function (element) {
                    return element.name === nameUser;
                })
                console.log('Resultado del filtrado');
                console.log(listUserFound);
                // Render de kas coincidencias
                if(listUserFound.length === 0) {
                    contentHtml.innerHTML = 'No se encontraron elementos con ese nombre';
                    
                } else {
                    contentHtml.innerHTML = '';
                    
                    runList(listUserFound, contentHtml)
                }

            }
        })

    }

    // Funcion Principal
    function main() {
        // Obteniendo Contenedo html
        var $boxConntentHtml = document.querySelector('#boxListUsers');
        var $ArticlesContainer = $('#App_Container').find('.Articles_containers');
        var $txtBoxSearchByName = document.querySelector('#txt_box_search');
        var $btnBoxSearchByName = document.querySelector('#btn_box_search');
        // Lectura de Usuarios
        readUsers($boxConntentHtml);

        // Evento click to Read usuario by id
        $ArticlesContainer.on('click', '.itemUser', function (ev) {
            let $this = $(this)
            let $article = $this.closest('.itemUser')
            let id = $article.data('id')

            // Lectura Template de Usuario por Id
            readUserById(id, $boxConntentHtml)
        })

        // Filtro por caja de texto by name
       $btnBoxSearchByName.addEventListener('click', function (ev) {

            let nameUser = $txtBoxSearchByName.value;

            searchByName(nameUser, $boxConntentHtml);
       })

         // Evento click to Delete usuario by id
        // $ArticlesContainer.on('click', '.itemUserDelete', function (ev) {
        //     let $this = $(this)
        //     let $article = $this.closest('.itemUser')
        //     let id = $article.data('id')
        //     console.log('Ready to delete');
        //     // Lectura Template de Usuario por Id
        // })

        //  // Evento click to Update usuario by id
        // $ArticlesContainer.on('click', '.itemUserUpdate', function (ev) {
        //     let $this = $(this)
        //     let $article = $this.closest('.itemUser')
        //     let id = $article.data('id')
        //     console.log('Ready to update');
        //     // Lectura Template de Usuario por Id
        // })

    }

    // Inicializando Lectura
    window.addEventListener('load', main);

})();