module.exports = (io) => {

    // Emitir la posición del repartidor tanto latitud y longuitud

    // Los namespaces nos permiten trabajar con diferentes módulos en sockets, ejemplo posición, chat, etc.
    const orderDeliveryNamespace = io.of('/orders/delivery');

    // Evento que se ejecuta cuando nos conectamos a IO desde la aplicaión móvil,
    // éste evento devuelve un socket 
    orderDeliveryNamespace.on('connection', function(socket) {

        console.log('USUARIO CONECTADO AL NAMESPACE /orders/delivery');

        socket.on('position_delivery', function(data) {
            console.log(`DELIVERY EMITIO ${JSON.stringify(data)}`);
            // Permite emitir al cliente específico la posición del repartidor
            orderDeliveryNamespace.emit(`position_delivery/${data.id_order}`, { lat: data.lat, lng: data.lng  });
        });

        socket.on('disconnect', function(data) {
            console.log('USUARIO DESCONECTADO');
        });
    });

}