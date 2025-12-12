# CI/CD 工作流程说明

## 文件说明

- `ci-cd.yml`: 主要的 CI/CD 配置文件，定义了完整的构建、测试和部署流程

## 工作流程

### 1. 触发条件
- 推送到 `main` 分支
- 针对对 `main` 分支的 Pull Request

### 2. 作业流程

#### test 作业
- 检出代码
- 设置 Node.js 18 环境
- 安装依赖 (`npm ci`)
- 运行类型检查 (`npm run build`)
- 运行测试 (`npm test`)

#### build 作业
- 依赖 test 作业完成
- 构建生产版本
- 上传构建产物到 GitHub Actions Artifacts

#### deploy 作业
- 仅在推送到 main 分支时执行
- 依赖 build 作业完成
- 下载构建产物
- 部署到 GitHub Pages

## 环境变量

需要在 GitHub 仓库的 Settings > Secrets 中配置：
- `GITHUB_TOKEN`: GitHub 提供的默认 token，用于部署到 GitHub Pages

## 自定义配置

### 修改部署目标
如需部署到其他平台，请修改 `deploy` 作业中的部署步骤。常见部署目标：

#### Vercel
```yaml
- name: 部署到 Vercel
  uses: amondnet/vercel-action@v25
  with:
    vercel-token: ${{ secrets.VERCEL_TOKEN }}
    vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
    vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
    vercel-args: '--prod'
```

#### Netlify
```yaml
- name: 部署到 Netlify
  uses: nwtgck/actions-netlify@v2
  with:
    publish-dir: './dist'
    production-branch: main
  env:
    NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
    NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}
```

## 性能优化

- 使用 `npm ci` 替代 `npm install` 以获得更快的安装速度
- 启用依赖缓存
- 并行执行独立的作业
- 上传构建产物以避免重复构建

## 故障排除

1. **构建失败**: 检查 `package.json` 中的构建脚本是否正确
2. **测试失败**: 确保测试文件存在且可运行
3. **部署失败**: 验证 Secrets 配置是否正确
4. **权限问题**: 确保 GitHub Actions 有足够权限

## 监控和日志

- 所有作业的详细日志可在 GitHub Actions 页面查看
- 构建产物可在 Actions 页面的 Artifacts 部分下载
- 部署状态会显示在 Pull Request 和 Commit 页面