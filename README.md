## change remote url for private repo
**git remote set-url origin https://bestknight1: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@github.com/bestknight1/auraflix-01-dba.git**

## how to add remote url for private repo
**git remote add origin https://bestknight1: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@github.com/bestknight1/auraflix-01-dba.git**

### vercel.json for node server

`
{
  "version": 2,
  "builds": [
    {
      "src": "index.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "index.js"
    }
  ]
}
`
