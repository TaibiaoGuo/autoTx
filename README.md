<div align=center><h1> autoTx </h1></div>
<div align=center><img src="https://github.com/TaibiaoGuo/autoTx/workflows/master%20building/badge.svg" /></div>

Let your transactions browser display some randomly transactions by this autoTx script.

# Build
```bash
docker build -t autotx:latest .
```

> TIPS: If  in China, use the following command to speed up building:
>
> `docker build -t autotx:latest -f DockerfileCN .`

# RUN
You need to input your ethereum private key and your HTTP RPC URL by `-e` option when running this docker image. For each running, 4 transctions would be created. 

```bash
docker run --name="my-autotx" -d -e PK="YOUR_PRIVATE_KEY" -e HRPC="YOUR_HTTP_RPC_URL" autotx:latest
```

If you need to keep trading, Please use the command as following:

```bash
docker run --name="my-autotx" -d -e PK="YOUR_PRIVATE_KEY" -e HRPC="YOUR_HTTP_RPC_URL"  --restart=always autotx:latest
```
