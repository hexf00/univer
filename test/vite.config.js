import { defineConfig } from 'vite'
// import { univerPlugin } from "@univerjs/vite-plugin";
import react from '@vitejs/plugin-react'
import { univerPlugin } from "@univerjs/vite-plugin";
import createViteConfig from '@univerjs/shared/vite';
import pkg from './package.json';

// https://vitejs.dev/config/
// export default defineConfig({
//     plugins: [
//         // univerPlugin(),
//         react({
//             babel: {
//                 parserOpts: {
//                     plugins: ['decorators-legacy', 'classProperties']
//                 }
//             }
//         })
//     ],
// })


export default  ({ mode }) => createViteConfig({
    plugins: [
        react({
            babel: {
                parserOpts: {
                    plugins: ['decorators-legacy', 'classProperties']
                }
            }
        })
    ],
},{
    mode,
    pkg,
    features: {
        react: false,
        css: true,
        dom: true,
    },
})
