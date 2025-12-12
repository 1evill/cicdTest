# GitHub Pages 部署权限配置指南

## 错误说明

遇到的错误：
```
remote: Write access to repository not granted.
fatal: unable to access 'https://github.com/1evill/cicdTest.git/': The requested URL returned error: 403
```

这是因为 GitHub Actions 默认没有写入权限。

## 🔧 解决方案

### 方案1：在仓库设置中启用权限

1. **进入仓库设置**
   - 打开 GitHub 仓库
   - 点击 `Settings` 标签

2. **配置 Actions 权限**
   - 左侧菜单选择 `Actions` → `General`
   - 滚动到 `Workflow permissions`
   - 选择 `Read and write permissions`
   - ✅ 勾选 `Allow GitHub Actions to create and approve pull requests`
   - 点击 `Save`

3. **配置 Pages 权限**
   - 左侧菜单选择 `Pages`
   - `Build and deployment` 部分设置：
     - Source: `Deploy from a branch`
     - Branch: `gh-pages` / `(root)`
     - 文件夹: `/ (root)`

### 方案2：使用新的部署配置文件

我已经创建了 `.github/workflows/deploy.yml`，这个文件使用更新的 GitHub Actions 部署方法：

- 使用 `permissions` 块明确指定权限
- 使用 `actions/deploy-pages@v2` 官方部署 action
- 自动管理 GitHub Pages 环境

### 方案3：修改现有配置

在现有的 `ci-cd.yml` 中添加用户信息：
```yaml
- name: 部署到 GitHub Pages
  uses: peaceiris/actions-gh-pages@v3
  with:
    github_token: ${{ secrets.GITHUB_TOKEN }}
    publish_dir: ./dist
    user_name: github-actions[bot]
    user_email: github-actions[bot]@users.noreply.github.com
```

## 📋 推荐操作步骤

### 使用方案1（最简单）：
1. 进入仓库 Settings
2. Actions → General → Workflow permissions
3. 选择 "Read and write permissions"
4. 保存设置
5. 重新推送代码触发 CI/CD

### 使用方案2（最新方法）：
1. 删除 `ci-cd.yml` 中的部署部分
2. 使用 `deploy.yml` 替代
3. 确保仓库启用了 GitHub Pages

## 🔍 验证权限设置

1. **检查 Actions 权限**
   - Settings → Actions → General
   - 确认选择了正确的权限级别

2. **检查 Pages 状态**
   - Settings → Pages
   - 确认 Pages 已启用且配置正确

3. **查看工作流日志**
   - Actions 页面查看详细错误信息
   - 确认权限相关的错误已解决

## 🚀 测试部署

完成权限配置后：

1. 推送代码到 main 分支：
   ```bash
   git add .
   git commit -m "配置 GitHub Pages 部署权限"
   git push origin main
   ```

2. 查看 Actions 运行状态
3. 成功后访问：`https://[你的用户名].github.io/[仓库名]/`

## 🆘 常见问题

### Q: 还是报权限错误？
A: 检查是否是 fork 仓库，fork 仓库需要额外的配置

### Q: Pages 显示 404？
A: 确保 Pages 设置中的分支和文件夹正确

### Q: 构建成功但部署失败？
A: 检查 `publish_dir` 路径是否正确（应该是 `./dist`）

## 📞 获取帮助

- [GitHub Actions 权限文档](https://docs.github.com/en/actions/security-guides/automatic-token-authentication#permissions-for-the-github_token)
- [GitHub Pages 文档](https://docs.github.com/en/pages)
- 如果问题持续，可以查看 Actions 页面的详细日志