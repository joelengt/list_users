var config = {
    mongodb:{
        local: 'mongodb://localhost/astrum',
        mlab: 'mongodb://astrum:astrum@ds145395.mlab.com:45395/node_app'
    },
    postgresql: {
      local: 'postgres://joelengt:kuroyukihime2110@localhost:4002/usuarios', // mac joel
      //local: 'postgres://postgres:postgres@localhost:5432/usuarios_list' // server
    },
    path_system: {
        server: '/root/usuarios_list'
    }
}

module.exports = config
