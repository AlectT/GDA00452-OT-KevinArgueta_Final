-----------------------------------CREACION DE LA BASE DE DATOS A USAR ------------------------------------------
create database [GDA00452-OT-KevinArgueta];


-----------------------------------UTILIZACION DE LA BASE DE DATOS CREADA ---------------------------------------
use [GDA00452-OT-KevinArgueta];

----------------------------------CREACION DE TABLAS Y RELACIONES ENTRE TABLAS ----------------------------------
create table Clientes(
	idClientes int identity,
	razon_social varchar(245) not null,
	nombre_comercial varchar(345) not null,
	telefono varchar(45),
	email varchar(45),
	direccion_entrega varchar(45) not null
	constraint PK_clientes primary key(idClientes)
);

create table Rol(
	idRol int identity,
	nombre varchar(45) not null
	constraint PK_rol primary key(idRol)
);

create table Estados(
	idEstados int identity,
	nombre varchar(45) not null
	constraint PK_idEstados primary key(idEstados)
);

create table Usuarios(
	idUsuarios int identity,
	idRol int not null,
	idEstados int not null,
	idClientes int,
	correo_electronico varchar(50) not null,
	nombre_completo varchar(60) not null,
	password varchar(250) not null,
	telefono varchar(45),
	fecha_nacimiento date not null,
	fecha_creacion datetime not null,
	constraint PK_idUsuarios primary key (idUsuarios)
);

alter table Usuarios
add constraint FK_rol_idRol_usuarios foreign key (idRol) references Rol(idRol);

alter table Usuarios
add constraint FK_estados_idEstados_usuarios foreign key (idEstados) references Estados(idEstados);

alter table Usuarios
add constraint FK_clientes_idClientes_usuarios foreign key (idClientes) references Clientes(idClientes);

create table CategoriaProductos(
	idCategoriaProductos int identity,
	idUsuarios int not null,
	nombre varchar(45) not null,
	idEstados int not null,
	fecha_creacion datetime not null,
	constraint PK_idCategoriaProductos primary key (idCategoriaProductos),
	constraint FK_usuarios_idUsuarios_categoriaProductos foreign key (idUsuarios) references Usuarios(idUsuarios),
	constraint FK_estados_idEstados_categoriaProductos foreign key (idEstados) references Estados(idEstados)
);

create table Orden(
	idOrden int identity,
	idUsuarios int not null,
	idEstados int not null,
	fecha_creacion datetime not null,
	nombre_completo varchar(60) not null,
	direccion varchar(545) not null,
	telefono varchar(45) not null,
	correo_electronico varchar(50) not null,
	fecha_entrega date not null,
	total_orden float not null,
	constraint PK_idOrden primary key (idOrden),
	constraint FK_usuarios_idUsuarios_orden foreign key (idUsuarios) references Usuarios(idUsuarios),
	constraint FK_estados_idEstados_orden foreign key (idEstados) references Estados(idEstados)
);

create table Productos(
	idProductos int identity,
	idCategoriaProductos int not null,
	idUsuarios int not null,
	idEstados int not null,
	nombre varchar(45) not null,
	marca varchar(45) not null,
	codigo varchar(45) not null,
	stock float not null,
	precio float not null,
	fecha_creacion datetime not null,
	foto varchar(max),
	constraint PK_idProductos primary key(idProductos),
	constraint FK_categoriaProductos_idCategoriaProductos_productos foreign key (idCategoriaProductos) references CategoriaProductos(idCategoriaProductos),
	constraint FK_usuarios_idUsuarios_productos foreign key (idUsuarios) references Usuarios(idUsuarios),
	constraint FK_estados_idEstados_productos foreign key (idEstados) references Estados(idEstados)
);


create table OrdenDetalles(
	idOrdenDetalles int identity,
	idOrden int not null,
	idProductos int not null,
	cantidad int not null,
	precio float not null,
	subtotal float not null,
	constraint PK_idOrdenDetalles primary key (idOrdenDetalles),
	constraint FK_orden_idOrden_ordenDetalles foreign key (idOrden) references Orden(idOrden),
	constraint FK_productos_idProductos_ordenDetalles foreign key (idProductos) references Productos(idProductos)
);


----------------------------- CREACION DE LOS PROCEDIMIENTOS ALMACENADOS -------------------------------
create procedure pCrearRol
  @nombreRol varchar(45)
as
  begin
    insert into Rol values (@nombreRol);
	print 'Rol creado con exito';
  end;


create procedure pCrearCliente
  @razon_social varchar(245),
  @nombre_comercial varchar(345),
  @telefono varchar(45),
  @email varchar(45),
  @direccion_entrega varchar(45)
as
  begin
    insert into Clientes values (@razon_social, @nombre_comercial, @telefono, @email, @direccion_entrega);
	print 'Cliente agregado con exito';
  end;

create procedure pCrearEstado
  @nombre varchar(45)
as
  begin
    insert into Estados values (@nombre)
	print 'Estado creado con exito';
  end;


create procedure pCrearUsuario
  @rol int,
  @estado int,
  @cliente int,
  @correo varchar(50),
  @nombre varchar(60),
  @password varchar(250),
  @telefono varchar(45),
  @fecha_nacimiento date,
  @fecha_creacion datetime
as
  begin
    insert into Usuarios values (@rol, @estado, @cliente, @correo, @nombre, @password, @telefono, @fecha_nacimiento, @fecha_creacion);
	print 'Usuario nuevo creado con exito';
  end;
  
create procedure pCrearCategoriaP
  @usuario int,
  @nombre varchar(45),
  @estado int,
  @fecha_creacion datetime
as
  begin
    if (select idRol from Usuarios where idUsuarios = @usuario) = 2
	begin 
	  insert into CategoriaProductos values (@usuario, @nombre, @estado, @fecha_creacion);
	  print 'Nueva categoria creada con exito';
	end
	else
	  begin
	    print 'El usuario no es operador';
	  end

  end;
  
create procedure pCrearOrden
  @usuario int,
  @estado int,
  @fecha_creacion datetime,
  @nombre varchar(60),
  @direccion varchar(545),
  @telefono varchar(45),
  @correo varchar(50),
  @fecha date,
  @total float
as
  begin
	insert into Orden values (@usuario, @estado, @fecha_creacion, @nombre, @direccion, @telefono, @correo, @fecha, @total);
	print 'Nueva orden exitosa';
  end;

create procedure pCrearProducto
  @categoria int,
  @usuario int,
  @estado int,
  @nombre varchar(45),
  @marca varchar(45),
  @codigo varchar(45),
  @stock float,
  @precio float,
  @fecha_creacion datetime,
  @foto varchar(max)
as
  begin
    if (select idRol from Usuarios where idUsuarios = @usuario) = 2
	begin 
	  insert into Productos values (@categoria, @usuario, @estado, @nombre, @marca, @codigo, @stock, @precio, @fecha_creacion, @foto);
	  print 'Nueva orden exitosa';
	end
	else
	  begin
	    print 'El usuario debe ser operador';
	  end

  end;

create procedure pCrearOrdenDetalles
  @orden int,
  @producto int,
  @cantidad int,
  @precio float,
  @subtotal float
as
  begin
	insert into OrdenDetalles values (@orden, @producto, @cantidad, @precio, @subtotal);
	print 'Detalles agregados exitosamente';
  end;

--------------------------------- PROCEDIMIENTOS DE ACTUALIZACION DE DATOS ----------------------------------

create procedure pActualizarUsuario
  @usuario int,
  @nombre varchar(60),
  @telefono varchar(45)
as
  begin transaction;
    if exists(select * from Usuarios where idUsuarios = @usuario)
	begin
	  update Usuarios set nombre_completo = @nombre, telefono = @telefono where idUsuarios = @usuario;
	  commit transaction;
	  print 'actualizado correctamente';
    end;
	else
	  begin
	  rollback transaction;
	  print 'error';
	end;

create procedure pActualizarRol
  @rol int,
  @nombre varchar(45)
as
  begin transaction;
    if exists(select * from Rol where idRol = @rol)
	begin
	  update Rol set nombre = @nombre where idRol = @rol;
	  commit transaction;
	  print 'actualizado correctamente';
    end;
	else
	  begin
	  rollback transaction;
	  print 'error';
	end;

create procedure pActualizarEstado
  @estado int,
  @nombre varchar(45)
as
  begin transaction;
    if exists(select * from Estados where idEstados = @estado)
	begin
	  update Estados set nombre = @nombre where idEstados = @estado;
	  commit transaction;
	  print 'actualizado correctamente';
    end;
	else
	  begin
	  rollback transaction;
	  print 'error';
	end;

create procedure pActualizarCliente
  @cliente int,
  @razon_social varchar(245),
  @nombre_comercial varchar(345),
  @direccion_entrega varchar(45),
  @telefono varchar(45),
  @email varchar(45)
as
  begin transaction;
    if exists(select * from Clientes where idClientes = @cliente)
	begin
	  update Clientes set razon_social = @razon_social, nombre_comercial = @nombre_comercial, direccion_entrega = @direccion_entrega, telefono = @telefono, email = @email where idClientes = @cliente;
	  commit transaction;
	  print 'actualizado correctamente';
    end;
	else
	  begin
	  rollback transaction;
	  print 'error';
	end;

create procedure pActualizarCategoria
  @categoria int,
  @nombre varchar(45)
as
  begin transaction;
    if exists(select * from CategoriaProductos where idCategoriaProductos = @categoria)
	begin
	  update CategoriaProductos set nombre = @nombre where idCategoriaProductos = @categoria;
	  commit transaction;
	  print 'actualizado correctamente';
    end;
	else
	  begin
	  rollback transaction;
	  print 'error';
	end;


create procedure pActualizarOrden
  @orden int,
  @nombre varchar(60),
  @direccion varchar(545),
  @telefono varchar(45),
  @correo varchar(50),
  @fecha date,
  @estado int
as
  begin transaction;
    if exists(select * from Orden where idOrden = @orden)
	begin
	  update Orden set nombre_completo = @nombre, direccion = @direccion, telefono = @telefono, correo_electronico = @correo, fecha_entrega = @fecha, idEstados = @estado where idOrden = @orden;
	  commit transaction;
	  print 'actualizado correctamente';
    end;
	else
	  begin
	  rollback transaction;
	  print 'error';
	end;

create procedure pActualizarProducto
  @producto int,
  @categoria int,
  @nombre varchar(45),
  @marca varchar(45),
  @codigo varchar(50),
  @stock float,
  @precio float,
  @foto varchar(max)
as
  begin transaction;
    if (exists(select * from Productos where idProductos = @producto) and exists(select * from CategoriaProductos where idCategoriaProductos = @categoria))
	begin
	  update Productos set idCategoriaProductos = @categoria, nombre = @nombre, marca = @marca, codigo = @codigo, stock = @stock, precio = @precio, foto = @foto where idProductos = @producto;
	  commit transaction;
	  print 'actualizado correctamente';
    end;
	else
	  begin
	  rollback transaction;
	  print 'error';
	end;


create procedure pActualizarDetalles
  @detalle int,
  @cantidad int,
  @subtotal float
as
  begin transaction;
    if exists(select * from OrdenDetalles where idOrdenDetalles = @detalle)
	begin
	  update OrdenDetalles set cantidad = @cantidad, subtotal = @subtotal where idOrdenDetalles = @detalle;
	  commit transaction;
	  print 'actualizado correctamente';
    end;
	else
	  begin
	  rollback transaction;
	  print 'error';
	end;
	
create procedure pActualizarTotalOrden
  @orden int,
  @total float
as
  begin transaction;
    if exists(select * from Orden where idOrden = @orden)
	begin
	  update Orden set total_orden = @total where idOrden = @orden;
	  commit transaction;
	  print 'actualizado correctamente';
    end;
	else
	  begin
	  rollback transaction;
	  print 'error';
	end;


--------------------------------- PROCEDIMIENTOS DE ACTUALIZACION DE ESTADOS ----------------------------------

create procedure pCambiarEstadoUsuario
  @elemento int,
  @estado int
as
  begin transaction;
    if exists(select * from Usuarios where idUsuarios = @elemento)
	begin
	  update Usuarios set idEstados = @estado where idUsuarios = @elemento;
	  commit transaction;
	  print 'actualizado correctamente';
    end;
	else
	  begin
	  rollback transaction;
	  print 'error';
	end;


create procedure pCambiarEstadoProducto
  @elemento int,
  @estado int
as
  begin
	update Productos set idEstados = @estado where idProductos = @elemento;
	print 'Estado cambiado correctamente';
  end;

create procedure pCambiarEstadoCategoria
  @elemento int,
  @estado int
as
  begin transaction;
    if exists(select * from CategoriaProductos where idCategoriaProductos = @elemento)
	begin
	  update CategoriaProductos set idEstados = @estado where idCategoriaProductos = @elemento;
	  commit transaction;
	  print 'actualizado correctamente';
    end;
	else
	  begin
	  rollback transaction;
	  print 'error';
	end;

create procedure pCambiarEstadoOrden
  @elemento int,
  @estado int
as
  begin transaction;
    if exists(select * from Orden where idOrden = @elemento)
	begin
	  update Orden set idEstados = @estado where idOrden = @elemento;
	  commit transaction;
	  print 'actualizado correctamente';
    end;
	else
	  begin
	  rollback transaction;
	  print 'error';
	end;

---------------------------------------EJECUCION DE LOS PROCEDIMIENTOS CREADOS ------------------------------------------
exec pCrearRol @nombreRol = 'Cliente';
exec pCrearRol @nombreRol = 'Operador';


exec pCrearCliente @razon_social = 'NA', @nombre_comercial = 'NA', @telefono = '12345678', @email = 'pepeA@gmail.com', @direccion_entrega = '5av zona 1 Guatemala';
exec pCrearCliente @razon_social = 'Empresa GTP', @nombre_comercial = 'Productos Guatemaltecos', @telefono = '11223344', @email = 'GTP@gmail.com', @direccion_entrega = '8av zona 2 Guatemala';
exec pCrearCliente @razon_social = 'NA', @nombre_comercial = 'NA', @telefono = '23456789', @email = 'angelP@gmail.com', @direccion_entrega = '8av zona 3 Guatemala';
exec pCrearCliente @razon_social = 'NA', @nombre_comercial = 'NA', @telefono = '34567891', @email = 'hugoG@gmail.com', @direccion_entrega = '2av zona 3 Guatemala';
exec pCrearCliente @razon_social = 'NA', @nombre_comercial = 'NA', @telefono = '45678912', @email = 'franciscoC@gmail.com', @direccion_entrega = '8av zona 3 Guatemala';
exec pCrearCliente @razon_social = 'NA', @nombre_comercial = 'NA', @telefono = '56789123', @email = 'anaT@gmail.com', @direccion_entrega = '6av zona 12 Guatemala';
exec pCrearCliente @razon_social = 'NA', @nombre_comercial = 'NA', @telefono = '67891234', @email = 'julianL@gmail.com', @direccion_entrega = '8av zona 3 Guatemala';
exec pCrearCliente @razon_social = 'NA', @nombre_comercial = 'NA', @telefono = '78912345', @email = 'douglasA@gmail.com', @direccion_entrega = '8av zona 3 Guatemala';
exec pCrearCliente @razon_social = 'NA', @nombre_comercial = 'NA', @telefono = '89123456', @email = 'evelynG@gmail.com', @direccion_entrega = '1v zona 21 Guatemala';
exec pCrearCliente @razon_social = 'NA', @nombre_comercial = 'NA', @telefono = '91234567', @email = 'alexA@gmail.com', @direccion_entrega = '12av zona 10 Guatemala';
exec pCrearCliente @razon_social = 'NA', @nombre_comercial = 'NA', @telefono = '10203040', @email = 'brandonR@gmail.com', @direccion_entrega = '3av zona 6 Guatemala';
exec pCrearCliente @razon_social = 'NA', @nombre_comercial = 'NA', @telefono = '50607080', @email = 'aryF@gmail.com', @direccion_entrega = '8av zona 3 Guatemala';
exec pCrearCliente @razon_social = 'NA', @nombre_comercial = 'NA', @telefono = '23456789', @email = 'yanethM@gmail.com', @direccion_entrega = '4av zona 18 Guatemala';
exec pCrearCliente @razon_social = 'NA', @nombre_comercial = 'NA', @telefono = '23456789', @email = 'andreaR@gmail.com', @direccion_entrega = '20av zona 6 Guatemala';
exec pCrearCliente @razon_social = 'NA', @nombre_comercial = 'NA', @telefono = '98765432', @email = 'madeline@gmail.com', @direccion_entrega = '4av zona 5 Guatemala';
exec pCrearCliente @razon_social = 'NA', @nombre_comercial = 'NA', @telefono = '11112222', @email = 'testLogin@gmail.com', @direccion_entrega = '4av zona 21 Guatemala';

exec pCrearEstado @nombre = 'Producto Disponible'; -- 1
exec pCrearEstado @nombre = 'Producto no Disponible'; -- 2
exec pCrearEstado @nombre = 'Categoria Disponible'; -- 3
exec pCrearEstado @nombre = 'Categoria No Disponible'; -- 4
exec pCrearEstado @nombre = 'Usuario Activo'; -- 5
exec pCrearEstado @nombre = 'Usuario Inactivo'; -- 6
exec pCrearEstado @nombre = 'Orden en proceso'; -- 7
exec pCrearEstado @nombre = 'Orden rechazada'; -- 8
exec pCrearEstado @nombre = 'Orden confirmada'; -- 9
exec pCrearEstado @nombre = 'Entregado'; -- 10
exec pCrearEstado @nombre = 'Orden cancelada'; -- 11
exec pCrearEstado @nombre = 'Solicitud de orden'; -- 12

exec pCrearUsuario @rol = 2, @estado = 5, @cliente = null, @correo = 'adminGeneral@gmail.com', @nombre = 'Usuario para operador', @password = '$2b$08$0jZLUfljulEaPn6Ya5zieewuZjh2iTBolgqi93ZaLlcfwSmW.LnpS', @telefono = '12345678', @fecha_nacimiento = '2002-05-12', @fecha_creacion = '2024-12-05 13:58:30';
exec pCrearUsuario @rol = 1, @estado = 5, @cliente = 1, @correo = 'primerCliente@gmail.com', @nombre = 'Primer cliente', @password = '$2b$08$0jZLUfljulEaPn6Ya5zieewuZjh2iTBolgqi93ZaLlcfwSmW.LnpS', @telefono = '12345678', @fecha_nacimiento = '2005-04-12', @fecha_creacion = '2024-12-05 13:58:30';
exec pCrearUsuario @rol = 1, @estado = 5, @cliente = 2, @correo = 'segundoCliente@gmail.com', @nombre = 'Segundo cliente', @password = '$2b$08$0jZLUfljulEaPn6Ya5zieewuZjh2iTBolgqi93ZaLlcfwSmW.LnpS', @telefono = '12345678', @fecha_nacimiento = '2000-01-19', @fecha_creacion = '2024-12-05 13:58:30';

exec pCrearCategoriaP @usuario = 1, @nombre = 'Herramientas', @estado = 3, @fecha_creacion = '2024-12-05 14:20:35';

exec pCrearProducto @categoria = 1, @usuario = 1, @estado = 1, @nombre = 'Martillo', @marca = 'DeWALT', @codigo = 'MartilloDW', @stock = 30, @precio = 115, @fecha_creacion = '2024-12-05 14:42:14', @foto = null;
exec pCrearProducto @categoria = 1, @usuario = 1, @estado = 2, @nombre = 'Clavos', @marca = 'DeWALT', @codigo = 'ClavosDW', @stock = 250, @precio = 10.5, @fecha_creacion = '2024-12-05 14:42:14', @foto = null;

-----------------------------------------PROCEDIMIENTOS DE ACTUALIZACION DE ESTADOS---------------------------

exec pCambiarEstadoUsuario @usuario = 2, @estado = 5;

exec pCambiarEstadoCategoria @categoria = 2, @estado = 4;

exec pCambiarEstadoOrden @orden = 5, @estado = 8;

exec pCambiarEstadoProducto @producto = 1, @estado = 1;

---------------------------------------- CREACION DE LAS VIEWS ------------------------------------------------
create view vRol
as
select * from Rol;

create view vEstado
as
select * from Estados;

create view vCliente
as
select * from Clientes;

create view vUsuario
as
select Usuarios.*, Estados.nombre from Usuarios inner join Estados on Usuarios.idEstados = Estados.idEstados;

create view vCategoriaProductos
as
select CategoriaProductos.*, Estados.nombre as nombreEstado, Usuarios.nombre_completo as nombreUsuario from CategoriaProductos inner join Estados on CategoriaProductos.idEstados = Estados.idEstados inner join Usuarios on CategoriaProductos.idUsuarios = Usuarios.idUsuarios;

create view vOrden
as
select Orden.*, Estados.nombre from Orden left join Estados on Orden.idEstados = Estados.idEstados;

create view vProductos
as
select Productos.*, Estados.nombre as nombreEstado, CategoriaProductos.nombre as nombreCategoria, Usuarios.nombre_completo as nombreUsuario from Productos inner join CategoriaProductos on Productos.idCategoriaProductos = CategoriaProductos.idCategoriaProductos inner join Estados on Productos.idEstados = Estados.idEstados inner join Usuarios on Productos.idUsuarios = Usuarios.idUsuarios ;

create view vOrdenDetalles
as
select OrdenDetalles.*, Productos.nombre, Productos.marca, Productos.codigo, Productos.stock, Productos.foto from OrdenDetalles inner join Productos on OrdenDetalles.idProductos = Productos.idProductos;

-------------------------------------- PROCEDIMIENTO PARA VIEWS POR ID --------------------------------

create procedure pUsuarioID
  @id int
as
  begin
	select Usuarios.*, Estados.nombre, Rol.nombre as nombreRol, Clientes.email as correoCliente from Usuarios left join Estados on Usuarios.idEstados = Estados.idEstados left join Rol on Usuarios.idRol = Rol.idRol left join Clientes on Usuarios.idClientes = Clientes.idClientes where idUsuarios = @id;
  end;


create procedure pRolID
  @id int
as
  begin
    select * from Rol where idRol = @id;
  end;

create procedure pEstadoID
  @id int
as
  begin
    select * from Estados where idEstados = @id;
  end;

create procedure pClienteID
 @id int
as
  begin
    select * from Clientes where idClientes = @id;
  end;

create procedure pCategoriaProductosID
  @id int
as
  begin
    select CategoriaProductos.*, Estados.nombre as nombreCategoria from CategoriaProductos inner join Estados on CategoriaProductos.idEstados = Estados.idEstados where idCategoriaProductos = @id;
  end;

create procedure pProductoID
  @id int
as
  begin
    select Productos.*, CategoriaProductos.nombre as nombreCategoria, Estados.nombre as nombreEstado from Productos inner join CategoriaProductos on Productos.idCategoriaProductos = CategoriaProductos.idCategoriaProductos inner join Estados on Productos.idEstados = Estados.idEstados where idProductos = @id;
  end;
  
create procedure pOrdenID
  @id int
as
  begin
    select Orden.*, Estados.nombre as nombreEstado from Orden left join Estados on Orden.idEstados = Estados.idEstados where Orden.idOrden = @id;
  end;

create procedure pOrdenDetallesID
  @id int
as
  begin 
	select OrdenDetalles.*, Productos.nombre, Productos.foto, Productos.marca from OrdenDetalles inner join Productos on OrdenDetalles.idProductos = Productos.idProductos where idOrdenDetalles = @id;
  end;

------------------------------------ PROCEDIMIENTOS ADICIONALES PARA EL FRONT END Y BACKEND ----------------------------

create procedure pSumaTotal
  @orden int
as
  begin
    select sum(subtotal) as Total from OrdenDetalles where idOrden = @orden;
  end;

create procedure pPrecioProducto
  @producto int
as
  begin
    select precio from Productos where idProductos = @producto;
  end

create procedure pEliminarDetalle
  @detalle int
as
  begin
    delete from OrdenDetalles where idOrdenDetalles = @detalle;
  end;

create procedure pCarritoClientes
  @id int
as
  begin 
    select OrdenDetalles.idOrdenDetalles, OrdenDetalles.cantidad, OrdenDetalles.precio, OrdenDetalles.subtotal, Orden.idEstados, Orden.idUsuarios ,Orden.idOrden, Orden.total_orden, Orden.idEstados, Estados.nombre as nombreEstado, Productos.nombre as nombreProducto, Productos.marca, Productos.idProductos, Productos.foto, Productos.stock from Orden left join OrdenDetalles on Orden.idOrden = OrdenDetalles.idOrden left join Productos on OrdenDetalles.idProductos = Productos.idProductos left join Estados on Orden.idEstados = Estados.idEstados where Orden.idOrden = @id  ;
  end;

create procedure pCarritoDetallado
  @id int
as
  begin
    select Orden.*, OrdenDetalles.cantidad, OrdenDetalles.idOrdenDetalles, OrdenDetalles.subtotal, Productos.codigo, Productos.foto, Productos.idProductos, Productos.nombre as nombreProducto, Productos.idProductos, Productos.marca, Productos.stock, Estados.nombre as nombreEstado from Orden left join OrdenDetalles on Orden.idOrden = OrdenDetalles.idOrden left join Productos on OrdenDetalles.idProductos = Productos.idProductos left join Estados on Orden.idEstados = Estados.idEstados where Orden.idOrden = @id;
  end;

create procedure pLimpiarCarrito
  @orden int
as
  begin
    delete from OrdenDetalles where idOrden = @orden;
  end;


create procedure pActualizarStock
  @producto int,
  @stock float,
  @estado int
as
  begin
    update Productos set stock = @stock, idEstados = @estado where idProductos = @producto;
  end;


create procedure pBuscarProductoNombre
  @id varchar(45)
as
  begin
    select Productos.*, Estados.nombre as nombreEstado, CategoriaProductos.nombre as nombreCategoria from Productos inner join Estados on Productos.idEstados = Estados.idEstados inner join CategoriaProductos on Productos.idCategoriaProductos = CategoriaProductos.idCategoriaProductos where Productos.nombre like '%'+@id+'%';
  end;

create procedure pBuscarProductosCategoria
  @id varchar(45)
as
  begin
    select Productos.*, Estados.nombre as nombreEstado, CategoriaProductos.nombre as nombreCategoria from Productos inner join Estados on Productos.idEstados = Estados.idEstados inner join CategoriaProductos on Productos.idCategoriaProductos = CategoriaProductos.idCategoriaProductos where CategoriaProductos.nombre = @id;
  end;

create procedure pHistorialCompras
  @id int
as
  begin
    select Orden.*, Estados.nombre as nombreEstado from Orden left join Estados on Orden.idEstados = Estados.idEstados where Orden.idUsuarios = @id;
  end;

create procedure pBuscarPorCategoria
  @categoria int
as
  begin
    select * from Productos where idCategoriaProductos = @categoria;
  end;

create procedure pObtenerStock
  @producto int
as
  begin
    select stock from Productos where idProductos = @producto;
  end;

create procedure pOrdenActual
  @usuario int
as
  begin
    select top(1) * from Orden where idUsuarios = @usuario order by idOrden desc;
  end;

create procedure pBuscarUsuarioCorreo
  @correo varchar(50)
as
  begin
    select * from Usuarios where correo_electronico = @correo;
  end;


------------------------------------- CREACION DE VIEWS SOLICITADAS -----------------------------------
create view vProductosActivos
as
select * from Productos where idEstados = 1 and stock > 0;

create view vIngresosAgosto
as
select SUM(total_orden) as Ingresos from Orden where (DATEPART(yy, fecha_creacion) = 2024 and DATEPART(mm, fecha_creacion) = 08);

create view vClientesFrecuentes
as
select top(10) OrdenDetalles.idOrden, count(OrdenDetalles.idOrden) as Consumo , Orden.nombre_completo from OrdenDetalles left join Orden on OrdenDetalles.idOrden = Orden.idOrden group by OrdenDetalles.idOrden, Orden.nombre_completo order by Consumo desc;

create view vProductosMasVendidos
as
select top(3) OrdenDetalles.idProductos, count(OrdenDetalles.idProductos) as Venta, Productos.nombre from OrdenDetalles left join Productos on OrdenDetalles.idProductos = Productos.idProductos group by OrdenDetalles.idProductos, Productos.nombre order by Venta desc;

------------------------------------- EJECUCION DE LAS VIEWS -------------------------------------------
select * from vRol;

select * from vCliente;

select * from vEstado;

select * from vUsuario;

select * from vCategoriaProductos;

select * from vOrden;

select * from vProductos;

select * from vOrdenDetalles;

---------------------------------------- EJECUCION DE VIEW SOLICITADAS --------------------------------------

select * from vProductosActivos;

select * from vIngresosAgosto;

select * from vClientesFrecuentes;

select * from vProductosMasVendidos;
