# Dify Admin Template

一个企业级 Agent 平台前端架构模板，支持 AI 聊天、多Agent 协作、工作流管理等核心功能。

## ✨ 特性

- 🤖 **多Agent 协作** - 支持 Agent 链式调用和工作流编排
- 🔄 **工作流管理** - 可视化编辑器，支持节点拖拽和条件分支
- 📚 **知识库管理** - 文档上传、自动嵌入、向量检索
- 🛠️ **MCP 工具管理** - 集成第三方工具和 API
- 🔐 **权限管理** - RBAC 模型，细粒度权限控制
- 📊 **实时交互** - 基于事件驱动的实时更新
- 🎨 **现代 UI** - TailwindCSS + shadcn/ui
- ⚡ **高性能** - 支持 100+ 页面规模
- 👥 **团队协作** - 支持 50+ 开发人员协作

## 🚀 快速开始

### 前置要求

- Node.js 18+
- pnpm 8+
- Git

### 安装

```bash
# 克隆仓库
git clone https://github.com/mqq-persistence/dify-admin-template.git
cd dify-admin-template

# 安装依赖
pnpm install

# 配置环境变量
cp .env.example .env.local

# 启动开发服务器
pnpm dev
```

访问 [http://localhost:3000](http://localhost:3000)

## 📋 项目结构

```
dify-admin-template/
├── src/
│   ├── app/                 # Next.js App Router
│   ├── pages/               # 页面文件
│   ├── features/            # 功能模块
│   ├── entities/            # 数据实体
│   ├── shared/              # 共享资源
│   ├── stores/              # Zustand 状态管理
│   ├── copilot/             # CopilotKit 集成
│   └── ag-ui/               # AG-UI 事件系统
├── public/                  # 静态资源
├── ARCHITECTURE.md          # 架构文档
└── package.json
```

详见 [ARCHITECTURE.md](./ARCHITECTURE.md)

## 🛠️ 技术栈

| 类别 | 技术 |
|-----|------|
| **框架** | Next.js 16, React 19, TypeScript |
| **样式** | TailwindCSS, shadcn/ui, Radix UI |
| **状态管理** | Zustand, React Query |
| **表单** | React Hook Form, Zod |
| **AI/Agent** | CopilotKit, AG-UI |
| **HTTP** | Axios |
| **图表** | ECharts |
| **包管理** | pnpm |

## 📚 核心模块

### 认证管理 (Authentication)
- 登录/注册
- 令牌管理
- 权限验证
- 自动过期处理

### Agent 模块
- Agent 列表管理
- Agent 配置编辑
- Agent 聊天界面
- 工具选择和配置

### 工作流引擎
- 可视化工作流编辑
- 节点管理和连接
- 条件分支和循环
- 工作流执行和监控

### 知识库系统
- 文档上传
- 自动嵌入和索引
- 向量检索
- 文档预览

### MCP 工具管理
- 工具连接配置
- 工具测试
- 工具使用统计

### 权限系统
- 4 种角色：Super Admin, Org Admin, Developer, Employee
- 细粒度权限控制
- 资源级别权限
- 审计日志

## 🔧 常用命令

```bash
# 开发
pnpm dev

# 构建
pnpm build

# 生产预览
pnpm start

# 代码检查
pnpm lint

# 类型检查
pnpm type-check

# 格式化
pnpm format
```

## 📖 文档

- [完整架构设计](./ARCHITECTURE.md) - 详细的系统架构说明
- [API 文档](./docs/API.md) - 待完成
- [开发指南](./docs/DEVELOPMENT.md) - 待完成
- [部署指南](./docs/DEPLOYMENT.md) - 待完成

## 🤝 贡献指南

欢迎提交 Issue 和 Pull Request！

1. Fork 本仓库
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 📝 许可证

本项目采用 MIT 许可证。详见 [LICENSE](./LICENSE) 文件。n
## 🙏 致谢

感谢以下开源项目的支持：

- [Next.js](https://nextjs.org/)
- [React](https://react.dev/)
- [TailwindCSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Zustand](https://github.com/pmndrs/zustand)
- [CopilotKit](https://copilotkit.ai/)

## 📧 联系方式

- 提交 Issue
- 发送邮件

---

**⭐ 如果有帮助，请给个 Star！**