import { Testimonial } from '../models/Testimoniales.js';

const guardarTestimonial = async (req, res) => {
    
    //Validar
    const { nombre, correo, mensaje } = req.body;

    const errores = [];

    if(nombre.trim() === '') {
        errores.push({mensaje : 'El campo del nombre está vacío'});
    }

    if(correo.trim() === '') {
        errores.push({mensaje : 'Ingresa un correo electrónico'});
    }

    if(mensaje.trim() === '') {
        errores.push({mensaje : 'Escribe un mensaje'});
    }

    if(errores.length > 0) {
        //Consultar testimonioales existentes
        const testimoniales = await Testimonial.findAll();

        //Mostrar vista con errores
        res.render('testimoniales', {
            pagina: 'Testimoniales',
            errores,
            nombre,
            correo,
            mensaje,
            testimoniales
        })
    } else {
        //Almacenarlo en la base de datos
        try {
            await Testimonial.create({
                nombre,
                correo,
                mensaje
            });

            res.redirect('/testimoniales');
        } catch (error) {
            console.log(error);
        }
    }

}

export {
    guardarTestimonial
}