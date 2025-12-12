# GitHub Actions 版本更新修复指南

## 🚨 问题描述

遇到错误：
```
This request has been automatically failed because it uses a deprecated version of `actions/upload-artifact: v3`.
```

这是因为使用了已弃用的 GitHub Actions 版本。

## ✅ 已修复的问题

### 1. **deploy.yml 文件更新**
- `actions/upload-pages-artifact@v2` → `actions/upload-pages-artifact@v3`
- `actions/deploy-pages@v2` → `actions/deploy-pages@v4`

### 2. **ci-cd.yml 文件更新**  
- `peaceiris/actions-gh-pages@v3` → `peaceiris/actions-gh-pages@v4`

## 📋 修复前后对比

### 修复前（已弃用版本）
```yaml
- uses: actions/upload-pages-artifact@v2
- uses: actions/deploy-pages@v2  
- uses: peaceiris/actions-gh-pages@v3
```

### 修复后（当前最新稳定版本）
```yaml
- uses: actions/upload-pages-artifact@v3
- uses: actions/deploy-pages@v4
- uses: peaceiris/actions-gh-pages@v4
```

## 🔧 修复说明

### 为什么需要更新？

1. **安全性** - 旧版本可能存在安全漏洞
2. **兼容性** - GitHub 逐步弃用旧版本
3. **性能** - 新版本通常有性能改进
4. **功能** - 新版本支持更多功能和修复

### 更新的 Actions 版本

| Action | 旧版本 | 新版本 | 用途 |
|--------|--------|--------|------|
| `actions/upload-pages-artifact` | v2 | v3 | 上传构建产物到 Pages |
| `actions/deploy-pages` | v2 | v4 | 部署到 GitHub Pages |
| `peaceiris/actions-gh-pages` | v3 | v4 | 第三方 GitHub Pages 部署 |

## 🚀 使用方法

### 方案1：使用 deploy.yml（推荐）
这是 GitHub 官方推荐的新方法：

1. 删除或注释 `ci-cd.yml` 中的部署部分
2. 使用 `deploy.yml` 文件
3. 确保 GitHub 仓库启用了 Pages

### 方案2：使用更新后的 ci-cd.yml
继续使用原有的 `ci-cd.yml` 文件，现在已经更新到最新版本。

## 🔍 验证修复

1. **推送代码**
   ```bash
   git add .
   git commit -m "修复 GitHub Actions 版本问题"
   git push origin main
   ```

2. **检查 Actions 运行状态**
   - 进入仓库的 Actions 页面
   - 查看最新的工作流程运行
   - 确认没有版本相关错误

3. **验证部署**
   - 检查 GitHub Pages 是否正常更新
   - 访问部署的网站确认功能正常

## 📊 最佳实践

### 定期更新
- 每月检查一次 Actions 版本更新
- 关注 GitHub 官方的 Actions 发布说明
- 及时测试新版本兼容性

### 版本锁定
- 使用具体版本号而不是 `@latest`  
- 在测试环境中验证新版本后再升级
- 记录版本更新日志

### 监控和告警
- 设置 Actions 失败通知
- 定期检查工作流程性能
- 关注弃用警告

## 🆘 常见问题

### Q: 更新后仍然报错？
A: 检查是否有其他地方使用了旧版本，或者清理 Actions 缓存后重试。

### Q: 哪个部署方案更好？
A: `deploy.yml` 是官方推荐的新方案，更稳定且功能更强大。

### Q: 如何保持 Actions 版本最新？
A: 使用 Dependabot 自动更新，或者定期手动检查更新。

## 📞 相关资源

- [GitHub Actions 官方文档](https://docs.github.com/en/actions)
- [Actions 版本发布说明](https://github.com/actions)
- [GitHub Pages 部署指南](https://docs.github.com/en/pages)