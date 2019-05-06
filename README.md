# easy-aos-docker

该镜像暂时只能编译esp8266，stm32系列板子（developerkit之类的）编译会出错

拉取镜像

```
docker pull walker2048/base && docker pull walker2048/easy-aos
```
>建议同时拉取base镜像，更新easy-aos镜像时可以快一些

```
docker run -v "c:/Users/35227/.aos/AliOS-Things":/home/AliOS-Things --name alios-things-build -it --rm walker2048/easy-aos:slim
```
>一定要把c:/Users/35227/.aos/AliOS-Things这里的内容替换成你下载的AliOS-Things目录的绝对路径，否则无法运行

运行此命令后，将会进入临时创建的容器命令行，此时可以运行编译命令