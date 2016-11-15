var config = {
    mongodb:{
        local: 'mongodb://localhost/astrum',
        mlab: 'mongodb://astrum:astrum@ds145395.mlab.com:45395/node_app'
    },
    postgresql: {
      local: 'postgres://postgres:@localhost:5432/usuarios' // server
    },
    path_system: {
        server: '/root/usuarios_list'
    }
}

module.exports = config
