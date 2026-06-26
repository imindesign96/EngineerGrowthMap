# Engineer Growth Map

Engineer Growth Map là web app dashboard giúp kỹ sư iOS theo dõi quá trình phát triển kỹ năng từ Middle lên Senior / Tech Lead theo phong cách RPG.

Ứng dụng dùng checklist kỹ năng, level, XP, quest, achievement, roadmap và daily log để biến việc học thành một hành trình có tiến độ rõ ràng.

## Công nghệ sử dụng

- Next.js
- React
- TypeScript
- Tailwind CSS
- Lucide Icons
- Vitest
- localStorage để lưu dữ liệu phía trình duyệt
- Không có backend trong bản MVP

## Chức năng chính

- Dashboard tổng quan theo phong cách RPG.
- Nhân vật đại diện thay đổi theo level.
- Danh sách kỹ năng iOS full-cycle:
  - Nền tảng iOS
  - Xác định yêu cầu
  - Thiết kế cơ bản
  - Thiết kế chi tiết
  - System Design / Architecture
  - API / Backend
  - Cơ sở dữ liệu
  - AWS / Hạ tầng
  - Bảo mật
  - Kiểm thử
  - Phát hành / Vận hành
  - Team Leadership / Communication
- Trang chi tiết kỹ năng với checklist task.
- Progress tự tính theo số task đã hoàn thành.
- Level tự tính từ tiến độ kỹ năng và các ngưỡng quan trọng.
- Roadmap học tập và task đề xuất tiếp theo.
- Daily Log lưu nhật ký học tập.
- Quest Board, Achievement, XP, Skill Rank, Weekly Goal.
- Dữ liệu lưu trong localStorage.

## Yêu cầu môi trường

Cần cài:

- Node.js 20 trở lên
- npm
- Git

Kiểm tra phiên bản:

```bash
node -v
npm -v
git --version
```

## Cài đặt project

Clone repo:

```bash
git clone git@github.com:imindesign96/EngineerGrowthMap.git
cd EngineerGrowthMap
```

Nếu dùng HTTPS:

```bash
git clone https://github.com/imindesign96/EngineerGrowthMap.git
cd EngineerGrowthMap
```

Cài dependency:

```bash
npm install
```

## Chạy ở môi trường development

```bash
npm run dev
```

Mở trình duyệt tại:

```text
http://localhost:3000
```

## Chạy test

```bash
npm test
```

Test hiện kiểm tra logic:

- Tính level từ Lv.1 đến Lv.6
- Backdoor preset level
- XP
- Quest
- Achievement
- Daily streak

## Build production

```bash
npm run build
```

Nếu build thành công, có thể chạy bản production local:

```bash
npm run start
```

Sau đó mở:

```text
http://localhost:3000
```

## Cấu trúc thư mục

```text
app/
  page.tsx                 Dashboard chính
  roadmap/page.tsx          Lộ trình học
  daily-log/page.tsx        Nhật ký học tập
  skills/[skillId]/page.tsx Chi tiết kỹ năng

components/
  app-shell.tsx             Layout header/navigation
  skill-card.tsx            Card kỹ năng
  progress-bar.tsx          Thanh tiến độ

lib/
  growth-data.ts            Seed data, level logic, quest, achievement, XP
  growth-data.test.ts       Unit test
  use-growth-store.ts       State và localStorage
  images/                   Ảnh nhân vật theo level
```

## Cách dữ liệu được lưu

Ứng dụng lưu dữ liệu trong `localStorage` của trình duyệt, gồm:

- Checklist kỹ năng
- Daily log
- Profile người dùng

Vì chưa có backend, dữ liệu chỉ tồn tại trên trình duyệt/máy hiện tại. Nếu mở bằng trình duyệt khác hoặc máy khác thì sẽ dùng dữ liệu mặc định.

## Cách reset dữ liệu

Trên UI có nút reset ở góc phải thanh điều hướng.

Nút này đưa dữ liệu về seed data ban đầu.

## Ảnh nhân vật theo level

Ảnh nhân vật đặt tại:

```text
lib/images/level-1.png
lib/images/level-2.png
lib/images/level-3.png
lib/images/level-4.png
lib/images/level-5.png
lib/images/level-6.png
```

Nếu muốn thay ảnh, giữ nguyên tên file để app tự dùng đúng level.

## Logic level

Level được tính dựa trên:

- Trung bình tiến độ toàn bộ kỹ năng
- Nền tảng iOS
- Thiết kế feature
- System Design / Architecture
- API / Backend
- Kiểm thử
- Communication / Leadership
- Năng lực full-cycle qua DB, AWS, Security, Release / Operation

Tóm tắt:

- Lv.1: Bắt đầu hành trình
- Lv.2: Middle iOS Engineer
- Lv.3: Middle vững
- Lv.4: Senior iOS Engineer
- Lv.5: Tech Lead Candidate
- Lv.6: Full Cycle Engineer

Chi tiết logic nằm trong:

```text
lib/growth-data.ts
```

## Deploy

Cách đơn giản nhất là deploy lên Vercel.

1. Push code lên GitHub.
2. Vào Vercel.
3. Import GitHub repository.
4. Framework chọn Next.js.
5. Build command giữ mặc định:

```bash
npm run build
```

6. Output mặc định của Next.js, không cần cấu hình thêm.

Lưu ý: Vì MVP dùng localStorage, mỗi người dùng sẽ có dữ liệu riêng trên trình duyệt của họ. Nếu muốn dùng chung dữ liệu giữa nhiều người, cần bổ sung backend/database.

## Phát triển tiếp

Một số hướng mở rộng:

- Thêm đăng nhập người dùng.
- Đồng bộ dữ liệu qua database.
- Thêm chế độ export/import dữ liệu.
- Thêm biểu đồ tiến độ theo thời gian.
- Thêm quest tùy chỉnh.
- Thêm badge/achievement nâng cao.
- Thêm hệ thống mentor/mentee hoặc guild.

## License

Project cá nhân/MVP. Cập nhật license nếu muốn public hoặc cho phép người khác sử dụng lại.
