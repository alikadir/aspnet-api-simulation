/// <binding BeforeBuild='concat' ProjectOpened='watch' />
/*
This file in the main entry point for defining grunt tasks and using grunt plugins.
Click here to learn more. http://go.microsoft.com/fwlink/?LinkID=513275&clcid=0x409
*/
module.exports = function (grunt)
{
    grunt.initConfig({


        concat: {

            externalScript: {
                src: ['Scripts/Lib/jquery-2.2.2.js', 'Scripts/Lib/bootstrap.js', 'Scripts/Lib/knockout-2.2.1.js', 'Scripts/Lib/knockout.viewmodel.2.0.3.js', 'Scripts/Lib/moment.js', 'Scripts/Lib/knockout.validation.js'],
                dest: 'Scripts/Dist/external.js',
            },

            internalScript: {
                src: ['Scripts/Commons/Extensions.js', 'Scripts/Commons/Helpers.js', 'Scripts/Commons/Constants.js', 'Scripts/Models/*.js', 'Scripts/Views/Admin.js'],
                dest: 'Scripts/Dist/internal.js',
            },

            externalStyles: {
                src: ['Styles/FontAwesome/font-awesome.min.css', 'Styles/Bootstrap/bootstrap.min.css'],
                dest: 'Styles/Dist/external.css',
            },

            internalStyles: {
                src: ['Styles/Common/Common.css'],
                dest: 'Styles/Dist/internal.css',
            },

        },
        /*        
        uglify: {
            scripts: {
                files: {
                    'Scripts/Dist/internal.min.js': ['Scripts/Dist/internal.js'],
                },
            },
            styles: {
                files: {
                    'Styles/Dist/internal.min.css': ['Styles/Dist/internal.css'],
                },
            },
        },
        */

        watch: { // ignore için "!" kullanılır
            scripts: {
                files: ['Scripts/**/*.js'],// '!Scripts/Dist/*'],
                tasks: ['concat', 'uglify'],
                options: {
                    spawn: false,
                },
            },
            styles: {
                files: ['Styles/**/*.css'],// '!Styles/Dist/*'],
                tasks: ['concat', 'uglify'],
                options: {
                    spawn: false,
                },
            }
        },

    });

    grunt.loadNpmTasks("grunt-contrib-concat");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-contrib-uglify");
};