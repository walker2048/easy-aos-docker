# 使用python2.7.15作为初始镜像
FROM python:2.7.15-slim-jessie

# 添加i386库支持
RUN echo "deb http://mirrors.aliyun.com/debian/ jessie main non-free contrib" > /etc/apt/sources.list && \
echo "deb http://mirrors.aliyun.com/debian/ jessie-proposed-updates main non-free contrib" >> /etc/apt/sources.list && \
echo "deb-src http://mirrors.aliyun.com/debian/ jessie main non-free contrib" >> /etc/apt/sources.list && \
echo "deb-src http://mirrors.aliyun.com/debian/ jessie-proposed-updates main non-free contrib" >> /etc/apt/sources.list && \
dpkg --add-architecture i386 && \
apt-get update && \
apt-get -y install --no-install-recommends \
libc6:i386 \
libc6-dev-i386 \
git \
# wget \
# gcc \
# make \
&& \
apt-get clean && \
rm -rf /var/lib/apt/lists/*
# 设置工作目录
WORKDIR /home/AliOS-Things/
# 添加工具链到镜像中
# add compiler.tar.gz /opt

ENV TZ "Asia/Shanghai"
ENV PATH /opt/easy-aos/compiler/bin:$PATH

ONBUILD RUN pip install --upgrade setuptools && \
pip install --upgrade wheel && \
pip install aos-cube

CMD ["bash"]