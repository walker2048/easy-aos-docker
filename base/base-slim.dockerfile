# 使用python2.7.15作为初始镜像
FROM python:2.7.16-alpine3.9

# 添加i386库支持
RUN echo "https://mirrors.aliyun.com/alpine/v3.9/main/" > /etc/apk/repositories && \
echo "https://mirrors.aliyun.com/alpine/v3.9/community/" >> /etc/apk/repositories && \
apk update && apk upgrade && \
apk add --no-cache \
bash \
git
# wget \
# gcc \
# make \

# 设置工作目录
WORKDIR /home/AliOS-Things/
# 添加工具链到镜像中
# add compiler.tar.gz /opt

ENV TZ "Asia/Shanghai"

ONBUILD RUN pip install --upgrade setuptools && \
pip install --upgrade wheel && \
pip install aos-cube

CMD ["/bin/bash"]