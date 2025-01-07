# parcel-project-template

## Dependencies

You must have the LTS version of [Node.js](https://nodejs.org/en/) installed on your computer.

## Before you start

Install all dependencies once per project.

```shell
npm ci
```

### Work

Enable work mode.

```shell
npm run dev
```

In your browser, go to [http://localhost:1234](http://localhost:1234).

### Deploy

The code will automatically assemble and deploy the current version of the project

to GitHub Pages, in the `gh-pages` branch, each time changes are made to `main`. For example, after a direct push or after accepting a pull-request. For this to work, we need to change the `homepage` field and the `build` script in the `package.json` file, changing `user_name` and `repository_name` to our own.

```json
"homepage": "https://user_name.github.io/repository_name",
"scripts": {
"build": "parcel build src/*.html --public-url /repository_name/"
},
```

After some time, the page will be visible live at the address that is entered in the corrected `homepage` properties, for example
[https://goitacademy.github.io/parcel-project-template](https://goitacademy.github.io/parcel-project-template).

## Files and folders

- All partial style files should be in the `src/sass` folder and imported in

`src/sass/main.scss`
- Add photos to the `src/images` folder, before that optimize the photos you add. The program simply

copies the used photos so that the system does not have to optimize them, because on weak computers

this can take a lot of time.