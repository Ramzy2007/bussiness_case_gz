require('dotenv').config();

const config = {
    mongodb: {
        // URL MongoDB obtenue du fichier .env
        url: process.env.MONGO_URI || "mongodb://localhost:27017",

        // Nom de la base de données
        databaseName: "business_case_gz", // Remplacez par le nom de votre base de données

        options: {

        }
    },

    // Le répertoire des migrations, peut être un chemin relatif ou absolu.
    migrationsDir: "migrations",

    // La collection MongoDB où les modifications appliquées sont stockées.
    changelogCollectionName: "changelog",

    // L'extension de fichier pour créer des migrations et rechercher dans le répertoire de migration.
    migrationFileExtension: ".js",

    // Activer l'algorithme pour créer une somme de contrôle du contenu du fichier et l'utiliser dans la comparaison pour déterminer
    // si le fichier doit être exécuté. Nécessite que les scripts soient codés pour être exécutés plusieurs fois.
    useFileHash: false,

    // Ne changez pas cela, sauf si vous savez ce que vous faites
    moduleSystem: 'commonjs',
};

module.exports = config;