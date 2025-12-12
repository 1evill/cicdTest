# GitHub Actions 权限修复指南

## 🚨 错误描述

遇到权限错误：
```
/usr/bin/git push origin gh-pages
remote: Permission to 1evill/cicdTest.git denied to github-actions[bot].
fatal: unable to access 'https://github.com/1evill/cicdTest.git/': The requested URL returned error: 403
```

## ✅ 修复方案

### 方案1：修改权限配置（已应用）

已将 `ci-cd.yml` 中的权限从：
```yaml
permissions:
  contents: read  # ❌ 只有读取权限
  pages: write
  id-token: write
```

修改为：
```yaml
permissions:
  contents: write  # ✅ 添加写入权限
  pages: write
  id-token: write
```

### 方案2：在 GitHub 仓库设置中配置（推荐同时执行）

1. **进入仓库设置**
   - 打开 GitHub 仓库 `1evill/cicdTest`
   - 点击 `Settings` 标签

2. **配置 Actions 权限**
   - 左侧菜单：`Actions` → `General`
   - 滚动到 `Workflow permissions`
   - 选择：`Read and write permissions`
   - ✅ 勾选：`Allow GitHub Actions to create and approve pull requests`
   - 点击 `Save`

3. **配置 Pages 设置**
   - 左侧菜单：`Pages`
   - `Source` 选择：`Deploy from a branch`
   - `Branch` 选择：`gh-pages`
   - `Folder` 选择：`/ (root)`
   - 点击 `Save`

## 🔧 权限说明

### GitHub Actions 权限类型

| 权限 | 说明 | 为何需要 |
|------|------|----------|
| `contents: read` | 读取仓库内容 | 检出代码 |
| `contents: write` | 写入仓库内容 | 推送到 `gh-pages` 分支 |
| `pages: write` | 管理 GitHub Pages | 配置和部署页面 |
| `id-token: write` | OIDC 令牌 | 安全认证 |

### GITHUB_TOKEN 权限范围

- **默认权限**：只有 `contents: read`
- **部署需要**：`contents: write` + `pages: write`
- **推送分支**：必须要有 `contents: write`

## 🚀 测试修复

### 1. 重新推送代码
```bash
git add .
git commit -m "修复 GitHub Actions 权限问题"
git push origin main
```

### 2. 验证构建
- 查看 Actions 页面的运行状态
- 确认没有权限相关错误
- 检查是否成功推送到 `gh-pages` 分支

### 3. 验证部署
- 访问 `https://1evill.github.io/cicdTest/`
- 确认网站正常显示

## 🔍 故障排除

### 如果仍然报权限错误：

#### 检查仓库类型
```bash
# 确认不是 fork 仓库
git remote -v
```

#### 清理并重新运行
```bash
# 在仓库 Settings → Actions 中点击 "Disable workflows"
# 然后重新启用，这会重置权限
```

#### 检查分支保护规则
- `Settings` → `Branches` → `Branch protection rules`
- 确认没有阻止 `gh-pages` 分支的推送

### 如果页面 404：

#### 等待 DNS 生效
GitHub Pages 部署需要 1-10 分钟生效

#### 检查 Pages 配置
- `Settings` → `Pages`
- 确认 Source 设置为 `gh-pages` 分支

## 📋 权限最佳实践

### 1. 最小权限原则
```yaml
# ✅ 推荐：只给必要的权限
permissions:
  contents: write    # 只在需要推送时设置
  pages: write       # 部署到 Pages 必需

# ❌ 不推荐：给所有权限
permissions: write-all
```

### 2. 环境特定的权限
```yaml
# 只在部署作业中设置写入权限
jobs:
  deploy:
    permissions:
      contents: write
      pages: write
```

### 3. 使用环境
```yaml
# 使用 GitHub Pages 环境获得更好的安全性
deploy:
  environment: 
    name: github-pages
    url: ${{ steps.deployment.outputs.page_url }}
```

## 🆘 获取帮助

- [GitHub Actions 权限文档](https://docs.github.com/en/actions/security-guides/automatic-token-authentication#permissions-for-the-github_token)
- [GitHub Pages 文档](https://docs.github.com/en/pages)
- [GITHUB_TOKEN 权限说明](https://docs.github.com/en/actions/security-guides/automatic-token-authentication#permissions-for-the-github_token)

## 📊 验证清单

- [ ] 仓库设置中启用了 "Read and write permissions"
- [ ] `ci-cd.yml` 中有 `contents: write` 权限
- [ ] GitHub Pages 已启用且配置正确
- [ ] 没有分支保护规则阻止推送
- [ ] 不是 fork 仓库（fork 需要额外配置）

完成以上步骤后，重新推送代码，权限问题应该彻底解决！