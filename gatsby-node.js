const UrlSlug = require('url-slug');

exports.createPages = async({actions, graphql, reporter}) => {

    const resultado = await graphql(`
            query {
                allStrapiPaginas {
                    nodes {
                      nombre
                      id
                    }
                  }


                allStrapiPropiedades {
                nodes {
                    nombre
                    id
                }
                }
            }
    
    `);
    //console.log(JSON.stringify(resultado.data.allStrapiPropiedades));

    //si no hay resultado
    if(resultado.errors) {
        reporter.panic('No hubo resultados', resultado.errors);
    }

    //Si hay resultados generar los archivos staticos
    const paginas = resultado.data.allStrapiPaginas.nodes;
     const propiedades = resultado.data.allStrapiPropiedades.nodes;

     //crear los template para paginas
     paginas.forEach(pagina => {
        //  console.log(UrlSlug(propiedad.nombre))
        actions.createPage({
            path: UrlSlug(pagina.nombre),
            component: require.resolve('./src/components/paginas.js'),
            context: {
                id: pagina.id
            }
        })

     });

     //crear los templates de propiedades
     propiedades.forEach(propiedad => {
        //  console.log(UrlSlug(propiedad.nombre))
        actions.createPage({
            path: UrlSlug(propiedad.nombre),
            component: require.resolve('./src/components/propiedades.js'),
            context: {
                id: propiedad.id
            }
        })

     });


}