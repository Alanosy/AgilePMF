

# Frontend for a SpringBoot-based Project Management System

#### Introduction

This system is designed to monitor project completion progress and facilitate collaborative development.

This is my backend repository. For the frontend repository, please see [Backend Project Address](https://github.com/Alanosy/AgilePMB.git)

This project is my graduation thesis. It is a project management system based on SpringBoot, inspired by existing market products, and is intended for academic research only. If any content is deemed inappropriate, please contact fignet@163.com for removal. The system was developed because I often neglected project progress during development, leading to delays upon product delivery. With this system, users can create projects, break down requirements and tasks, and create issues in the Issue Center for the corresponding developers to resolve. On the homepage, you can view this week's tasks and overdue tasks. On the burndown chart page, you can track how the number of tasks gradually decreases over time until it reaches zero, allowing you to observe development completion trends. Of course, completion trends are also visible in the project details. If you have any questions, feel free to leave a comment in the Issues; I will reply as soon as I see them. You can also email me directly.

If you are interested in this project, welcome to join us! You can contact me at fignet@163.com or submit a Pull Request directly. Currently, this project is a simple implementation without complex features, and some SQL queries or methods still require optimization.

If you find it helpful, please do me a favor and give it a star!

#### Screenshots

![截屏2024-11-06 上午11.24.20](https://alantypora.oss-cn-chengdu.aliyuncs.com/%E6%88%AA%E5%B1%8F2024-11-06%20%E4%B8%8A%E5%8D%8811.24.20.png)

![截屏2024-11-06 上午11.23.40](https://alantypora.oss-cn-chengdu.aliyuncs.com/%E6%88%AA%E5%B1%8F2024-11-06%20%E4%B8%8A%E5%8D%8811.23.40.png)

![截屏2024-11-06 上午11.28.37](https://alantypora.oss-cn-chengdu.aliyuncs.com/%E6%88%AA%E5%B1%8F2024-11-06%20%E4%B8%8A%E5%8D%8811.28.37.png)

![截屏2024-11-06 上午11.23.59](https://alantypora.oss-cn-chengdu.aliyuncs.com/%E6%88%AA%E5%B1%8F2024-11-06%20%E4%B8%8A%E5%8D%8811.23.59.png)

![截屏2024-11-06 上午11.24.07](https://alantypora.oss-cn-chengdu.aliyuncs.com/%E6%88%AA%E5%B1%8F2024-11-06%20%E4%B8%8A%E5%8D%8811.24.07.png)

![截屏2024-11-06 上午11.24.13](https://alantypora.oss-cn-chengdu.aliyuncs.com/%E6%88%AA%E5%B1%8F2024-11-06%20%E4%B8%8A%E5%8D%8811.24.13.png)



#### System Architecture

##### Functional Structure Diagram

![image-20241106112528524](https://alantypora.oss-cn-chengdu.aliyuncs.com/image-20241106112528524.png)

##### ER Diagram

![image-20241106112556977](https://alantypora.oss-cn-chengdu.aliyuncs.com/image-20241106112556977.png)



### Technology Stack

![image-20241106112624123](https://alantypora.oss-cn-chengdu.aliyuncs.com/image-20241106112624123.png)

#### Backend Technologies


| Technology       | Description                        | Official Site                                            |
| ---------------- | ---------------------------------- | -------------------------------------------------------- |
| SpringBoot       | Web Application Framework          | https://spring.io/projects/spring-boot                   |
| SpringSecurity   | Authentication & Authorization Framework | https://spring.io/projects/spring-security             |
| MyBatisPlus      | ORM Framework                      | http://www.mybatis.org/mybatis-3/zh/index.html           |
| MyBatisGenerator | Data Layer Code Generator          | http://www.mybatis.org/generator/index.html              |
| Redis            | In-Memory Data Store               | https://redis.io/                                        |
| Druid            | Database Connection Pool           | https://github.com/alibaba/druid                         |
| OSS              | Object Storage                     | https://github.com/aliyun/aliyun-oss-java-sdk            |
| MinIO            | Object Storage                     | https://github.com/minio/minio                           |
| JWT              | JWT Login Support                  | https://github.com/jwtk/jjwt                             |
| Lombok           | Java Language Enhancement Library  | https://github.com/rzwitserloot/lombok                   |
| Hutool           | Java Utility Library               | https://github.com/looly/hutool                          |

### Development Tools


| Tool           | Description                    | Official Site                                                     |
| -------------- | ------------------------------ | ----------------------------------------------------------------- |
| IDEA           | Development IDE                | https://www.jetbrains.com/idea/download                           |
| RedisDesktop   | Redis Client Connection Tool   | https://github.com/qishibo/AnotherRedisDesktopManager             |
| SwitchHosts    | Local Host Management          | https://oldj.github.io/SwitchHosts/                               |
| Navicat        | Database Connection Tool       | http://www.formysql.com/xiazai.html                               |
| Xmind          | Mind Mapping Design Tool       | http://www.edrawsoft.cn/mindmaster                                |
| Draw           | Flowchart Drawing Tool         | https://draw.io                                                   |
| Apifox         | API Interface Debugging Tool   | http://apifox.com                                                 |
| Typora         | Markdown Editor                | https://typora.io/                                                |

### Development Environment


| Tool  | Version | Download                                                              |
| ----- | ------- | --------------------------------------------------------------------- |
| JDK   | 17      | https://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html |
| MySQL | 5.7     | https://www.mysql.com/                                                |
| Redis | 7.0     | https://redis.io/download                                             |
| Nginx | 1.22    | http://nginx.org/en/download.html                                     |



#### Contributing

1. Fork this repository
2. Create a new `Feat_xxx` branch
3. Commit your code
4. Create a Pull Request

## License

[Apache License 2.0](https://github.com/macrozheng/mall/blob/master/LICENSE)
