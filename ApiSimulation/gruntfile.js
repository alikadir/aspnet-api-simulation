/// <binding BeforeBuild='concat' ProjectOpened='watch' />
/*
This file in the main entry point for defining grunt tasks and using grunt plugins.
Click here to learn more. http://go.microsoft.com/fwlink/?LinkID=513275&clcid=0x409
*/
module.exports = function (grunt) {
    grunt.initConfig({

        
        concat: {
           
            external: {
                src: ['Scripts/Lib/jquery-2.2.2.js', 'Scripts/Lib/bootstrap.js', 'Scripts/Lib/knockout-2.2.1.js', 'Scripts/Lib/knockout.viewmodel.2.0.3.js'],
                dest: 'Scripts/Dist/external.js',
            },

            internal: {
                src: ['Scripts/Commons/Extensions.js', 'Scripts/Commons/Helpers.js', 'Scripts/Commons/GlobalVariables.js', 'Scripts/Models/*.js', 'Scripts/Views/Admin.js' ],
                dest: 'Scripts/Dist/internal.js',
            },
        },

        watch: {
            scripts: {
                files: ['Scripts/**/*.js'],
                tasks: ['concat'],
                options: {
                    spawn: false,
                },
            },
        },
        
    });

    grunt.loadNpmTasks("grunt-contrib-concat");
    grunt.loadNpmTasks("grunt-contrib-watch");
};