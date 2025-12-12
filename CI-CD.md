# CI/CD 配置说明

## 概述

本项目配置了 GitHub Actions 实现自动化 CI/CD 流程，包含以下功能：

- ✅ 自动代码检出
- ✅ Node.js 环境设置
- ✅ 依赖安装
- ✅ TypeScript 类型检查
- ✅ 项目构建
- ✅ 自动部署到 GitHub Pages

## 文件结构

```
.github/
└── workflows/
    ├── ci-cd.yml      # 主要的 CI/CD 配置文件
    └── README.md      # 详细的工作流程说明
```

## 触发条件

- **推送到 main 分支**：执行完整的构建和部署流程
- **Pull Request 到 main 分支**：仅执行构建测试

## 工作流程

### 1. 环境准备
- 检出最新代码
- 设置 Node.js 18 环境
- 启用 npm 缓存加速

### 2. 依赖安装
- 使用 `npm ci` 快速安装依赖
- 确保依赖版本一致性

### 3. 构建过程
- 运行 TypeScript 类型检查
- 执行 Vite 构建命令
- 生成生产环境版本

### 4. 自动部署
- 仅在推送到 main 分支时执行
- 部署到 GitHub Pages
- 提供网站访问链接

## 配置特点

### 🔧 简化设计
- 单作业流程，减少复杂性
- 并行执行相关步骤
- 自动化程度高

### 🚀 性能优化
- 启用 npm 缓存
- 使用 `npm ci` 替代 `npm install`
- 禁用 sourcemap 减小文件大小

### 📊 监控和反馈
- 详细的构建日志
- 成功/失败状态显示
- 部署完成后提供访问链接

## 使用方法

1. **推送代码到 main 分支**
   ```bash
   git push origin main
   ```

2. **查看构建状态**
   - GitHub 仓库的 Actions 页面
   - Pull Request 中的状态检查
   - Commit 页面的状态标识

3. **访问部署的网站**
   ```
   https://[你的用户名].github.io/[仓库名]/
   ```

## 自定义配置

### 修改 Node.js 版本
在 `.github/workflows/ci-cd.yml` 中修改：
```yaml
env:
  NODE_VERSION: '20'  # 改为需要的版本
```

### 添加测试步骤
如果项目有测试，可在构建步骤后添加：
```yaml
- name: 运行测试
  run: npm test
```

### 部署到其他平台
参考 `.github/workflows/README.md` 中的部署配置示例

## 故障排除

### 构建失败
1. 检查 `package.json` 中的脚本是否正确
2. 确认 TypeScript 配置无误
3. 查看 Actions 日志中的错误信息

### 部署失败
1. 确保仓库启用了 GitHub Pages
2. 检查仓库权限设置
3. 验证 `GITHUB_TOKEN` 权限

### 权限问题
在仓库设置中确保：
- Actions 权限已启用
- GitHub Pages 已启用
- 工作流权限设置正确

## 最佳实践

- 🔍 定期检查 Actions 运行状态
- 📝 保持配置文件简洁明了
- 🔄 及时更新依赖版本
- 📊 监控构建时间和成功率
- 🔒 注意敏感信息安全

## 支持和帮助

- [GitHub Actions 官方文档](https://docs.github.com/en/actions)
- [Vite 构建工具文档](https://vitejs.dev/)
- [Vue 3 官方文档](https://vuejs.org/)