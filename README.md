# Lambda

A simplistic HTTP based lambda function implementation. Upload a zip file with Javascript / Typescript code that is run on an HTTP request.

## Getting started

Install dependencies

```
% npm install
```

Create the folder where the source code will be uploaded.

```
% mkdir runner
```

Start the server

```
% npm start
```

The server will be running by default on port 8000 so you can access it on `http://localhost:8000`

## Sample code

Create a sample application with the following code in a file called `index.js`:

```javascript
exports.handler = async (event) => {
  console.log(event);
  const res = {
    body: {
      message: 'hello world'
    }
  };
  return res;
}
```

Package the file in a zip file

```
% zip example.zip index.js 
```

Upload the zip file to the server (using curl for example)

```
% curl -v -F upload=@example.zip http://localhost:8000/upload
```

Try posting an event to the server and you will see that the code you uploaded is running.

```
% curl -v -X POST -H 'Content-Type: application/json' -d '{ "hej": "hopp" }' http://localhost:8000/event
{"message":"hello world"}
```
## License

This project is licensed under the MIT License, see [LICENSE](LICENSE).
