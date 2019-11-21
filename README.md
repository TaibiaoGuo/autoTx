<div align=center><h1> autoTx </h1></div>
<div align=center><img src="https://github.com/TaibiaoGuo/autoTx/workflows/master%20building/badge.svg" /></div>

Let your transactions browser display some randomly transactions by this autoTx script.

# Build
```bash
docker build -t autotx:latest .
```

# RUN
You need to input your ethereum private key and your HTTP RPC URL by `-e` option when running this docker image.
```bash
docker run --name="my-autotx" -d -e PK="YOUR_PRIVATE_KEY" -e HRPC="YOUR_HTTP_RPC_URL" autotx
```
