export type Difficulty = "easy" | "medium" | "hard";
export type SkillStatus = "Yếu" | "Đang học" | "Tốt" | "Mạnh";

export type LearningTask = {
  id: string;
  title: string;
  description: string;
  difficulty: Difficulty;
  completed: boolean;
};

export type Skill = {
  id: string;
  name: string;
  description: string;
  tasks: LearningTask[];
};

export type DailyLog = {
  id: string;
  date: string;
  learned: string;
  relatedSkillId: string;
  note: string;
};

export type SkillRank = "Novice" | "Apprentice" | "Skilled" | "Advanced" | "Expert" | "Master" | "Legendary";

export type QuestCategory = "Daily" | "Weekly" | "Epic";

export type Quest = {
  id: string;
  title: string;
  description: string;
  category: QuestCategory;
  rewardXp: number;
  rewardCoins: number;
  skillId: string;
  taskId: string;
  completed: boolean;
};

export type AchievementRarity = "Common" | "Rare" | "Epic" | "Legendary";

export type Achievement = {
  id: string;
  title: string;
  description: string;
  rarity: AchievementRarity;
  unlocked: boolean;
};

export type LevelInfo = {
  level: number;
  title: string;
  description: string;
};

export type LevelNumber = 1 | 2 | 3 | 4 | 5 | 6;

export type ProgressTargets = {
  all?: number;
  skills: Record<string, number>;
};

export const storageKeys = {
  skills: "engineer-growth-map:skills:vi-v3",
  logs: "engineer-growth-map:daily-logs",
  profile: "engineer-growth-map:profile:vi-v3",
};

export const roadmapOrder = [
  "ios-core",
  "api-backend",
  "database",
  "architecture-system-design",
  "basic-design",
  "detailed-design",
  "test",
  "aws-infra",
  "security",
  "release-operation",
  "requirements",
  "team-leadership-communication",
];

export const defaultProfile = {
  name: "Kỹ sư iOS",
  title: "Hành trình từ Middle lên Senior / Trưởng nhóm kỹ thuật",
};

const task = (
  id: string,
  title: string,
  description: string,
  difficulty: Difficulty,
): LearningTask => ({ id, title, description, difficulty, completed: false });

export const defaultSkills: Skill[] = [
  {
    id: "ios-core",
    name: "Nền tảng iOS",
    description:
      "Đánh giá nền tảng iOS từ mức đủ Middle đến Senior: Swift, UI, concurrency, architecture, memory, performance, accessibility và khả năng tự xử lý vấn đề production.",
    tasks: [
      task("swift-language-middle", "[Middle] Nắm chắc Swift language", "Dùng tốt struct/class/enum/protocol/generic/error handling/property wrapper và giải thích được khi nào nên dùng từng lựa chọn.", "easy"),
      task("ui-state-middle", "[Middle] Xây dựng UI state đầy đủ", "Một màn hình production có loading, empty, success, validation error, network error và retry rõ ràng.", "easy"),
      task("networking-middle", "[Middle] Tích hợp API chuẩn", "Decode JSON an toàn, xử lý status code, timeout, cancel request và mapping lỗi sang UI.", "medium"),
      task("architecture-middle", "[Middle] Áp dụng MVVM/Clean boundary", "Tách View, ViewModel, UseCase/Service/Repository đủ rõ để test và thay đổi không lan rộng.", "medium"),
      task("app-lifecycle-middle", "[Middle] Hiểu app lifecycle", "Nắm AppDelegate/SceneDelegate, foreground/background/inactive state và tác động đến UI, network, cache.", "medium"),
      task("permission-middle", "[Middle] Thiết kế permission flow", "Xử lý camera/photo/location/notification permission, denied state, settings deep link và UX khi quyền thay đổi.", "medium"),
      task("spm-build-middle", "[Middle] Quản lý SPM và build configuration", "Hiểu Swift Package Manager, Debug/Release/Staging config, scheme, bundle id và flag theo môi trường.", "medium"),
      task("swift-concurrency-senior", "[Senior] Làm chủ Swift Concurrency", "Áp dụng async/await, TaskGroup, actor, cancellation và MainActor đúng trong luồng thật, tránh race condition và update UI sai thread.", "hard"),
      task("memory-performance-senior", "[Senior] Debug memory/performance", "Dùng Instruments để tìm retain cycle, leak, main-thread hang hoặc render chậm và ghi lại nguyên nhân gốc.", "hard"),
      task("offline-cache-senior", "[Senior] Thiết kế cache/offline", "Thiết kế cache policy, stale data, refresh, optimistic update hoặc retry queue cho một workflow mobile.", "hard"),
      task("accessibility-senior", "[Senior] Đảm bảo accessibility", "Hỗ trợ VoiceOver, Dynamic Type, contrast, focus order và touch target cho màn hình phức tạp.", "medium"),
      task("modularization-senior", "[Senior] Định hướng modularization", "Đề xuất cách tách module/package, dependency direction và public interface để giảm coupling.", "hard"),
      task("background-task-senior", "[Senior] Thiết kế background task", "Hiểu background fetch, BGTaskScheduler, limitation của iOS, retry và battery/network constraint.", "hard"),
      task("push-notification-senior", "[Senior] Thiết kế push notification", "Hiểu APNs/device token, permission, payload, silent push, deep link từ notification và failure case.", "hard"),
      task("deeplink-senior", "[Senior] Thiết kế Deep Link / Universal Link", "Xử lý routing, auth-required flow, invalid link, deferred state và bảo mật cho deep link/universal link.", "hard"),
      task("localization-senior", "[Senior] Thiết kế localization", "Hỗ trợ nhiều ngôn ngữ, plural, date/currency format, text expansion và test UI đa ngôn ngữ.", "medium"),
      task("di-reactive-senior", "[Senior] Dùng Dependency Injection và reactive stack", "Thiết kế DI rõ ràng; hiểu Combine/RxSwift nếu dự án dùng, tránh retain cycle và stream phức tạp khó debug.", "hard"),
      task("ios-mentoring-lead", "[Lead] Review và mentor iOS design", "Review thiết kế/code iOS của người khác, chỉ ra tradeoff, rủi ro production và hướng cải thiện có thể hành động.", "hard"),
    ],
  },
  {
    id: "requirements",
    name: "Xác định yêu cầu",
    description:
      "Đánh giá khả năng chuyển ý tưởng sản phẩm thành yêu cầu rõ ràng, có tiêu chí nghiệm thu, scope, rủi ro và quyết định đủ để team triển khai.",
    tasks: [
      task("goal-middle", "[Middle] Hiểu mục tiêu nghiệp vụ", "Tóm tắt được vấn đề cần giải quyết, user mục tiêu, business goal và lý do ưu tiên.", "easy"),
      task("scope-middle", "[Middle] Xác định scope/non-scope", "Viết rõ phần làm, phần không làm, giả định và dependency trước khi estimate.", "easy"),
      task("acceptance-middle", "[Middle] Viết acceptance criteria", "Tạo tiêu chí nghiệm thu có thể test cho happy path, validation, permission, lỗi mạng và edge case.", "medium"),
      task("question-middle", "[Middle] Chuẩn bị câu hỏi làm rõ", "Chủ động gom câu hỏi về UX, API, dữ liệu, analytics, release và vận hành trước khi bắt đầu code.", "medium"),
      task("risk-senior", "[Senior] Phân tích rủi ro yêu cầu", "Nhận diện rủi ro về dữ liệu, bảo mật, migration, deadline, compatibility và trải nghiệm người dùng.", "hard"),
      task("mvp-senior", "[Senior] Cắt MVP hợp lý", "Chia yêu cầu lớn thành MVP, phase 2, nice-to-have và đề xuất tradeoff rõ cho stakeholder.", "hard"),
      task("metric-senior", "[Senior] Gắn yêu cầu với metric", "Định nghĩa success metric, guardrail metric và cách đo sau release.", "medium"),
      task("edge-senior", "[Senior] Làm rõ edge case hệ thống", "Bao phủ offline, retry, duplicate action, permission thay đổi, session hết hạn và dữ liệu stale.", "hard"),
      task("alignment-lead", "[Lead] Điều phối alignment", "Dẫn buổi review yêu cầu với PM/Design/Backend/QA để chốt quyết định và owner.", "hard"),
      task("requirement-template-lead", "[Lead] Chuẩn hóa template yêu cầu", "Tạo checklist/template giúp team viết yêu cầu nhất quán và giảm thiếu sót trước thiết kế.", "hard"),
    ],
  },
  {
    id: "basic-design",
    name: "Thiết kế cơ bản",
    description:
      "Đánh giá khả năng thiết kế ở mức feature/system: user flow, screen responsibility, API contract, data flow, phi chức năng và rollout.",
    tasks: [
      task("flow-middle", "[Middle] Vẽ user flow chính", "Mô tả các màn hình, action, điều kiện chuyển màn và trạng thái lỗi chính.", "easy"),
      task("screen-middle", "[Middle] Định nghĩa trách nhiệm màn hình", "Xác định input, output, navigation, state, validation và analytics event của từng màn hình.", "medium"),
      task("api-middle", "[Middle] Review API contract cơ bản", "Kiểm tra endpoint, request/response, status code, pagination, validation error và nullable field.", "medium"),
      task("dataflow-middle", "[Middle] Mô tả luồng dữ liệu", "Vẽ dữ liệu đi từ UI đến API/cache/storage và quay về UI như thế nào.", "medium"),
      task("alternative-senior", "[Senior] So sánh phương án thiết kế", "Đưa ra ít nhất hai phương án, tradeoff về effort, maintainability, risk và UX.", "hard"),
      task("nonfunctional-senior", "[Senior] Thiết kế yêu cầu phi chức năng", "Đưa performance, security, accessibility, observability và backward compatibility vào design.", "hard"),
      task("rollout-senior", "[Senior] Thiết kế rollout", "Đề xuất feature flag, phased rollout, rollback, migration và monitoring sau release.", "hard"),
      task("cross-team-senior", "[Senior] Chốt boundary với Backend/QA/Design", "Làm rõ owner, contract, mock data, test scope và dependency liên team.", "hard"),
      task("design-doc-lead", "[Lead] Viết design doc có sức thuyết phục", "Tài liệu có context, goal, non-goal, option, decision, risk, timeline và kế hoạch verify.", "hard"),
      task("review-design-lead", "[Lead] Review design của team", "Phát hiện thiếu sót trong design của người khác và đưa feedback giúp giảm rủi ro delivery.", "hard"),
    ],
  },
  {
    id: "detailed-design",
    name: "Thiết kế chi tiết",
    description:
      "Đánh giá khả năng biến thiết kế cơ bản thành cấu trúc code cụ thể: module, interface, state, error, test seam, migration và task breakdown.",
    tasks: [
      task("model-middle", "[Middle] Thiết kế model và DTO", "Tách API DTO, domain model, view state và mapping rõ ràng, xử lý nullable/default value an toàn.", "medium"),
      task("interface-middle", "[Middle] Định nghĩa protocol/interface", "Tạo interface cho service/repository/use case để dễ test và thay implementation.", "medium"),
      task("task-breakdown-middle", "[Middle] Chia task triển khai", "Tách ticket theo thứ tự: model, API, UI state, UI, test, analytics, release check.", "easy"),
      task("error-middle", "[Middle] Thiết kế error mapping", "Mapping lỗi network, auth, validation, server, empty data thành action/UI message cụ thể.", "medium"),
      task("state-senior", "[Senior] Mô hình hóa state machine", "Định nghĩa state và transition cho màn hình phức tạp, tránh boolean chồng chéo và trạng thái bất khả thi.", "hard"),
      task("dependency-senior", "[Senior] Kiểm soát dependency direction", "Thiết kế để domain không phụ thuộc UI/API framework và module không import vòng.", "hard"),
      task("migration-senior", "[Senior] Lập kế hoạch migration code/data", "Xử lý compatibility, fallback, data migration, cleanup và cách rollback nếu lỗi.", "hard"),
      task("test-design-senior", "[Senior] Thiết kế điểm test từ đầu", "Xác định unit/integration/UI test cần có trước khi code để cover luồng quan trọng.", "medium"),
      task("review-plan-lead", "[Lead] Lập kế hoạch review theo rủi ro", "Chia PR theo rủi ro, chỉ định reviewer, checkpoint và tiêu chí merge.", "hard"),
      task("standardize-lead", "[Lead] Chuẩn hóa pattern chi tiết", "Đề xuất template/pattern cho module, error, state và test để team áp dụng nhất quán.", "hard"),
    ],
  },
  {
    id: "api-backend",
    name: "API / Backend",
    description:
      "Đánh giá khả năng làm việc với backend ở mức mobile client: HTTP, auth, contract, resilience, debug, observability và phối hợp thay đổi API.",
    tasks: [
      task("http-middle", "[Middle] Nắm HTTP fundamentals", "Giải thích method, status code, header, cache, idempotency, pagination và rate limit.", "easy"),
      task("decode-middle", "[Middle] Decode response an toàn", "Xử lý nullable, missing field, date format, enum unknown và backward compatibility.", "medium"),
      task("api-auth-middle", "[Middle] Hiểu auth flow", "Trace login, refresh token, token expiration, logout, session invalid và unauthorized state.", "medium"),
      task("tooling-middle", "[Middle] Dùng công cụ debug API", "Dùng Postman/curl/Charles/Proxyman/log để chứng minh request/response và cô lập lỗi.", "medium"),
      task("backend-clean-middle", "[Middle] Hiểu Clean Architecture backend cơ bản", "Nắm vai trò Controller/Router, Service/UseCase, Repository, Entity/DTO và dependency direction phía backend.", "medium"),
      task("validation-middle", "[Middle] Hiểu server-side validation", "Biết backend cần validate required field, format, permission, business rule và trả lỗi để mobile hiển thị được.", "medium"),
      task("api-contract-senior", "[Senior] Review API contract", "Thảo luận schema, error format, pagination, sorting, filtering, versioning và deprecation.", "hard"),
      task("resilience-senior", "[Senior] Thiết kế resilience", "Đề xuất retry policy, timeout, cancellation, offline handling, duplicate prevention và partial failure.", "hard"),
      task("security-senior", "[Senior] Nhận diện rủi ro bảo mật API", "Kiểm tra token scope, TLS, PII trong log/error, permission và data exposure.", "hard"),
      task("observability-senior", "[Senior] Gắn request với observability", "Đề xuất correlation id, client version, error code và dashboard để debug production.", "medium"),
      task("transaction-senior", "[Senior] Hiểu DB transaction trong backend", "Giải thích khi nào backend cần transaction, rollback, idempotency và xử lý partial update.", "hard"),
      task("versioning-senior", "[Senior] Thiết kế API versioning strategy", "Đề xuất cách version endpoint/field, deprecate, compatibility window và migration cho app version cũ.", "hard"),
      task("background-job-senior", "[Senior] Hiểu background job / batch", "Biết khi nào xử lý async bằng job/batch thay vì request đồng bộ, và impact đến UX mobile.", "medium"),
      task("queue-webhook-senior", "[Senior] Hiểu message queue và webhook", "Nắm use case queue, retry, dead-letter, webhook signature, duplicate event và eventual consistency.", "hard"),
      task("file-upload-senior", "[Senior] Thiết kế file upload flow", "Hiểu multipart/presigned URL, progress, retry, file size, virus scan, permission và cleanup file lỗi.", "hard"),
      task("backend-collab-lead", "[Lead] Điều phối thay đổi API", "Chốt migration path, compatibility window, rollout và owner giữa iOS/Backend/QA.", "hard"),
      task("contract-standard-lead", "[Lead] Chuẩn hóa contract mobile", "Đề xuất convention response/error/pagination/versioning giúp mobile tích hợp ổn định hơn.", "hard"),
    ],
  },
  {
    id: "database",
    name: "Cơ sở dữ liệu",
    description:
      "Đánh giá hiểu biết dữ liệu từ góc nhìn mobile/full-cycle: schema, local persistence, cache, migration, consistency, query performance và data risk.",
    tasks: [
      task("schema-middle", "[Middle] Đọc schema cơ bản", "Giải thích table/entity, relation, primary key, foreign key, index và constraint trong một feature.", "easy"),
      task("acid-middle", "[Middle] Hiểu ACID", "Giải thích Atomicity, Consistency, Isolation, Durability bằng ví dụ thực tế như tạo đơn hàng/thanh toán.", "medium"),
      task("normalization-middle", "[Middle] Hiểu normalization/denormalization", "Biết vì sao tách bảng để giảm duplicate và khi nào denormalize để tối ưu đọc.", "medium"),
      task("local-storage-middle", "[Middle] Chọn storage local phù hợp", "So sánh UserDefaults, Keychain, file cache, SQLite/Core Data theo độ nhạy, kích thước và query.", "medium"),
      task("cache-middle", "[Middle] Thiết kế cache đơn giản", "Xác định TTL, invalidation, refresh, empty cache và fallback khi offline.", "medium"),
      task("migration-middle", "[Middle] Hiểu migration local", "Biết cách thêm field, đổi schema, default value và xử lý app version cũ.", "medium"),
      task("index-senior", "[Senior] Hiểu index/performance", "Giải thích index ảnh hưởng lookup/filter/sort và nhận diện query dễ gây chậm.", "hard"),
      task("query-plan-senior", "[Senior] Đọc query plan cơ bản", "Hiểu scan, index usage, join cost và dấu hiệu query gây chậm trên server DB.", "hard"),
      task("isolation-senior", "[Senior] Hiểu transaction isolation", "Nắm dirty read, non-repeatable read, phantom read ở mức khái niệm và impact đến logic backend.", "hard"),
      task("deadlock-senior", "[Senior] Hiểu deadlock cơ bản", "Giải thích vì sao deadlock xảy ra, cách retry hoặc thay đổi thứ tự lock để giảm rủi ro.", "hard"),
      task("consistency-senior", "[Senior] Xử lý consistency", "Thiết kế cho stale data, conflict, optimistic update, eventual consistency và retry.", "hard"),
      task("data-risk-senior", "[Senior] Phân tích rủi ro dữ liệu", "Nhận diện PII, retention, backup, corruption, duplicate data và data loss scenario.", "hard"),
      task("sync-senior", "[Senior] Thiết kế sync mobile", "Mô tả pull/push sync, cursor, delta update, conflict resolution và recovery.", "hard"),
      task("backup-restore-senior", "[Senior] Hiểu backup / restore", "Biết RPO/RTO cơ bản, backup schedule, restore drill và impact khi mất dữ liệu.", "medium"),
      task("read-replica-senior", "[Senior] Hiểu read replica", "Giải thích read scaling, replication lag và vì sao app có thể thấy dữ liệu stale.", "medium"),
      task("soft-delete-audit-senior", "[Senior] Thiết kế soft delete và audit log", "Hiểu deleted_at, restore, audit trail, compliance và ảnh hưởng đến query/filter.", "hard"),
      task("server-migration-senior", "[Senior] Lập kế hoạch data migration server-side", "Đề xuất expand-migrate-contract, backfill, rollback và compatibility với app version cũ.", "hard"),
      task("data-contract-lead", "[Lead] Chốt data contract liên team", "Điều phối field ownership, migration, backfill và compatibility giữa client/backend/data.", "hard"),
      task("data-review-lead", "[Lead] Review data design", "Review thiết kế dữ liệu của feature và chỉ ra rủi ro vận hành hoặc khả năng mở rộng.", "hard"),
    ],
  },
  {
    id: "architecture-system-design",
    name: "System Design / Architecture",
    description:
      "Đánh giá năng lực nhìn hệ thống tổng thể: mobile/web/API/DB/infra/external service, luồng dữ liệu, auth, reliability, scalability và tradeoff thiết kế.",
    tasks: [
      task("system-map-middle", "[Middle] Vẽ tổng thể hệ thống", "Vẽ sơ đồ Mobile/Web/API/DB/Infra/External service và giải thích vai trò từng khối trong một feature.", "medium"),
      task("sequence-middle", "[Middle] Vẽ sequence diagram luồng chính", "Mô tả thứ tự gọi giữa app, API, DB và external service cho happy path và một failure path.", "medium"),
      task("component-middle", "[Middle] Vẽ component diagram", "Tách các component chính, trách nhiệm, dependency và boundary giữa client/backend/external service.", "medium"),
      task("data-flow-middle", "[Middle] Vẽ data flow diagram", "Mô tả dữ liệu đi qua hệ thống, nơi lưu trữ, nơi transform và điểm có rủi ro PII/security.", "medium"),
      task("auth-flow-senior", "[Senior] Thiết kế auth flow", "Mô tả login, refresh token, session expired, logout, permission, OAuth/OIDC basic và edge case bảo mật.", "hard"),
      task("offline-sync-senior", "[Senior] Thiết kế offline/sync architecture", "Đề xuất cache, sync, conflict resolution, retry, stale data và recovery cho mobile workflow.", "hard"),
      task("scalability-senior", "[Senior] Hiểu scalability cơ bản", "Giải thích bottleneck, caching, pagination, async processing, read replica và khi nào cần scale.", "hard"),
      task("reliability-senior", "[Senior] Thiết kế reliability/availability", "Nhận diện single point of failure, timeout, retry, circuit breaker, fallback và monitoring signal.", "hard"),
      task("tradeoff-senior", "[Senior] Cân bằng simple design và over-engineering", "Giải thích vì sao chọn thiết kế đơn giản hoặc mở rộng, dựa trên risk, timeline, scale và maintainability.", "hard"),
      task("architecture-review-lead", "[Lead] Dẫn architecture review", "Facilitate review kiến trúc với iOS/Backend/Infra/QA, chốt decision record và action item rõ ràng.", "hard"),
    ],
  },
  {
    id: "aws-infra",
    name: "AWS / Hạ tầng",
    description:
      "Đánh giá hiểu biết hạ tầng đủ để iOS engineer phối hợp vận hành: môi trường, config, log, monitoring, incident, cost và cloud architecture cơ bản.",
    tasks: [
      task("aws-map-middle", "[Middle] Map dịch vụ AWS phổ biến", "Mô tả vai trò API Gateway, Lambda/ECS, RDS, S3, CloudFront, Cognito và CloudWatch.", "easy"),
      task("env-middle", "[Middle] Hiểu môi trường triển khai", "Phân biệt dev/staging/production, config, secret, feature flag và app environment.", "medium"),
      task("vpc-subnet-middle", "[Middle] Hiểu VPC và subnet", "Phân biệt VPC, CIDR, public subnet, private subnet, route table và internet gateway.", "medium"),
      task("sg-nacl-middle", "[Middle] Hiểu Security Group / NACL", "Giải thích inbound/outbound rule, stateful/stateless và cách giới hạn traffic cơ bản.", "medium"),
      task("iam-middle", "[Middle] Hiểu IAM policy / role", "Biết principle of least privilege, user/role/policy và vì sao không dùng long-lived credential trong app.", "medium"),
      task("release-config-middle", "[Middle] Kiểm tra config theo release", "Biết kiểm tra base URL, key, remote config, entitlement và bundle id trước release.", "medium"),
      task("logs-middle", "[Middle] Đọc log/metric cơ bản", "Tìm được log/error/metric liên quan đến một request hoặc user issue.", "medium"),
      task("alb-dns-ssl-middle", "[Middle] Hiểu Load Balancer, DNS, SSL", "Mô tả ALB/NLB cơ bản, Route53/DNS record, SSL certificate và ảnh hưởng đến mobile API.", "medium"),
      task("nat-middle", "[Middle] Hiểu NAT Gateway", "Biết private subnet dùng NAT Gateway để gọi internet và rủi ro cost/availability liên quan.", "medium"),
      task("monitoring-senior", "[Senior] Thiết kế monitoring mobile-facing", "Đề xuất metric, alert, dashboard và error budget cho API ảnh hưởng app.", "hard"),
      task("aws-incident-senior", "[Senior] Tham gia xử lý incident", "Biết cách triage, xác định blast radius, workaround, communication và follow-up.", "hard"),
      task("latency-senior", "[Senior] Phân tích latency", "Tách latency do network, CDN, backend, database, payload hoặc client rendering.", "hard"),
      task("cost-senior", "[Senior] Nhận diện cost/reliability tradeoff", "Hiểu lựa chọn cache, CDN, logging, retry và polling ảnh hưởng chi phí và độ ổn định.", "medium"),
      task("backup-ha-senior", "[Senior] Hiểu backup/restore và Multi-AZ", "Nắm backup, restore, failover, high availability, Multi-AZ và impact đến downtime/RPO/RTO.", "hard"),
      task("infra-collab-lead", "[Lead] Điều phối readiness vận hành", "Chốt checklist production readiness với Backend/SRE/QA trước launch.", "hard"),
      task("runbook-lead", "[Lead] Viết runbook cho mobile incident", "Tạo runbook gồm signal, dashboard, owner, mitigation, rollback và user communication.", "hard"),
    ],
  },
  {
    id: "security",
    name: "Bảo mật",
    description:
      "Đánh giá năng lực bảo mật thực tế cho mobile: data handling, auth, secure storage, API, privacy, dependency, threat modeling và release review.",
    tasks: [
      task("storage-middle", "[Middle] Chọn secure storage", "Phân biệt Keychain, UserDefaults, file storage và không lưu token/PII sai nơi.", "medium"),
      task("keychain-level-middle", "[Middle] Hiểu Keychain accessibility level", "Biết WhenUnlocked, AfterFirstUnlock, ThisDeviceOnly và impact đến security/UX/background access.", "medium"),
      task("transport-middle", "[Middle] Hiểu bảo mật transport", "Biết yêu cầu HTTPS/TLS, certificate issue, ATS và không log dữ liệu nhạy cảm.", "easy"),
      task("security-auth-middle", "[Middle] Xử lý auth an toàn", "Xử lý token refresh, logout, session expired, biometric lock và unauthorized state.", "medium"),
      task("privacy-middle", "[Middle] Nhận diện dữ liệu nhạy cảm", "Phân loại PII, analytics event, crash log, screen recording và retention concern.", "medium"),
      task("oauth-oidc-middle", "[Middle] Hiểu OAuth/OIDC basic", "Nắm authorization code flow, PKCE, access token, refresh token, ID token và logout/session concern.", "medium"),
      task("clipboard-privacy-middle", "[Middle] Nhận diện clipboard/privacy risk", "Tránh đọc/ghi clipboard không cần thiết, không leak PII qua pasteboard/log/analytics.", "medium"),
      task("owasp-senior", "[Senior] Review OWASP Mobile", "Áp dụng các rủi ro mobile phổ biến vào review feature cụ thể và đề xuất mitigation.", "hard"),
      task("threat-senior", "[Senior] Threat modeling nhẹ", "Mô tả asset, attacker, attack path, impact và mitigation cho một feature nhạy cảm.", "hard"),
      task("api-security-senior", "[Senior] Review bảo mật API", "Kiểm tra token scope, permission, error disclosure, replay, rate limit và data exposure.", "hard"),
      task("security-dependency-senior", "[Senior] Audit dependency", "Kiểm tra package risk, permission, vulnerability, update policy và supply chain concern.", "medium"),
      task("jailbreak-senior", "[Senior] Hiểu jailbreak/root detection awareness", "Biết detection chỉ là signal hỗ trợ, dễ bypass và cần tradeoff UX/security khi áp dụng.", "hard"),
      task("pinning-senior", "[Senior] Hiểu certificate pinning tradeoff", "Biết lợi ích, rủi ro operational, rotation certificate và không áp dụng mù quáng.", "hard"),
      task("app-attest-senior", "[Senior] Hiểu App Attest / DeviceCheck", "Nắm mục đích xác thực app/device, hạn chế fraud và các failure case cần xử lý.", "hard"),
      task("secure-enclave-senior", "[Senior] Hiểu Secure Enclave / biometric security", "Biết dùng biometric để bảo vệ secret, policy fallback và rủi ro khi device state thay đổi.", "hard"),
      task("screen-risk-senior", "[Senior] Nhận diện screenshot/screen recording risk", "Xác định màn hình nhạy cảm cần che, cảnh báo hoặc policy phù hợp theo yêu cầu sản phẩm.", "medium"),
      task("link-security-senior", "[Senior] Review deep link / universal links security", "Kiểm tra open redirect, auth bypass, parameter tampering, domain association và routing an toàn.", "hard"),
      task("security-review-lead", "[Lead] Dẫn security review", "Tổ chức review với Security/Backend/Product cho feature có dữ liệu nhạy cảm.", "hard"),
      task("security-checklist-lead", "[Lead] Chuẩn hóa checklist bảo mật", "Tạo checklist release/privacy/security để team dùng trước khi ship.", "hard"),
    ],
  },
  {
    id: "test",
    name: "Kiểm thử",
    description:
      "Đánh giá năng lực test từ tự đảm bảo chất lượng đến thiết kế chiến lược test cho feature/team: unit, integration, UI, contract, regression và release confidence.",
    tasks: [
      task("unit-middle", "[Middle] Viết unit test cơ bản", "Cover ViewModel/UseCase/decoder/error mapping với assertion rõ và test name dễ hiểu.", "medium"),
      task("mock-middle", "[Middle] Dùng mock/fake hợp lý", "Tạo fake service/repository và fixture ổn định, không phụ thuộc network/time thật.", "medium"),
      task("test-data-middle", "[Middle] Quản lý test data", "Tạo fixture/factory rõ ràng, dữ liệu ổn định, dễ đọc và không phụ thuộc môi trường thật.", "medium"),
      task("manual-middle", "[Middle] Lập checklist manual", "Tạo checklist cho happy path, error, empty, permission, offline và device size.", "easy"),
      task("regression-middle", "[Middle] Chạy regression trước release", "Biết chọn smoke test và regression area liên quan đến thay đổi.", "medium"),
      task("pyramid-senior", "[Senior] Thiết kế test pyramid", "Quyết định phần nào nên là unit, integration, UI, snapshot, manual hoặc contract test.", "hard"),
      task("ui-senior", "[Senior] Tự động hóa UI test có chọn lọc", "Automate critical path ổn định, tránh flaky, có test data và cleanup rõ.", "hard"),
      task("snapshot-senior", "[Senior] Dùng snapshot test đúng chỗ", "Áp dụng snapshot cho UI ổn định, kiểm soát dynamic data và tránh snapshot gây nhiễu review.", "medium"),
      task("test-contract-senior", "[Senior] Kiểm thử contract API", "Dùng mock server/schema/example để phát hiện contract break trước production.", "hard"),
      task("mock-server-senior", "[Senior] Contract test với mock server", "Dùng mock server để test success/error/edge case, latency và schema mismatch giữa app và API.", "hard"),
      task("instruments-performance-senior", "[Senior] Performance test bằng Instruments", "Đo CPU, memory, allocations, time profiler và xác định bottleneck có bằng chứng.", "hard"),
      task("memory-leak-senior", "[Senior] Memory leak test", "Kiểm tra leak/retain cycle sau khi dismiss màn hình, cancel task hoặc thay đổi subscription.", "hard"),
      task("launch-scroll-senior", "[Senior] Đo launch time và scroll performance", "Đo cold/warm launch, main thread work, frame drop và scroll hitch trên device thật.", "hard"),
      task("accessibility-test-senior", "[Senior] Accessibility testing", "Test VoiceOver, Dynamic Type, contrast, focus order và thao tác chỉ bằng accessibility.", "medium"),
      task("quality-signal-senior", "[Senior] Đọc tín hiệu chất lượng", "Theo dõi flaky test, crash-free, bug escape, coverage meaningful và regression trend.", "medium"),
      task("test-strategy-lead", "[Lead] Định nghĩa test strategy cho feature lớn", "Chốt scope test, owner, automation, manual pass, release gate và rollback condition.", "hard"),
      task("qa-collab-lead", "[Lead] Phối hợp QA hiệu quả", "Làm việc với QA để tạo test plan, risk matrix và triage bug theo impact.", "hard"),
    ],
  },
  {
    id: "release-operation",
    name: "Phát hành / Vận hành",
    description:
      "Đánh giá khả năng làm chủ vòng đời sau khi code xong: CI/CD, signing, App Store, release risk, monitoring, incident, rollback và post-release learning.",
    tasks: [
      task("ci-middle", "[Middle] Hiểu pipeline CI/CD", "Mô tả build, lint, test, signing, archive, upload TestFlight/App Store và failure thường gặp.", "medium"),
      task("signing-middle", "[Middle] Hiểu signing/provisioning", "Biết certificate, provisioning profile, capability, bundle id và lỗi signing phổ biến.", "medium"),
      task("appstore-middle", "[Middle] Thực hiện release App Store", "Chuẩn bị metadata, screenshot, review note, export compliance, TestFlight và submission.", "medium"),
      task("release-check-middle", "[Middle] Chạy release checklist", "Kiểm tra config, version/build number, feature flag, analytics, crash reporting và smoke test.", "easy"),
      task("crashlytics-middle", "[Middle] Dùng Firebase Crashlytics", "Đọc crash, non-fatal error, affected users, app version, device/OS và stack trace cơ bản.", "medium"),
      task("appstore-analytics-middle", "[Middle] Đọc App Store Connect analytics", "Theo dõi installs, conversion, crash, reviews, phased release và version adoption.", "medium"),
      task("remote-config-middle", "[Middle] Hiểu Remote Config / feature flag", "Biết bật/tắt tính năng, rollout theo segment/version và kiểm soát default value an toàn.", "medium"),
      task("phased-senior", "[Senior] Lập kế hoạch phased rollout", "Chọn rollout %, monitor signal, pause condition và communication khi có lỗi.", "hard"),
      task("monitor-senior", "[Senior] Theo dõi sức khỏe release", "Đọc crash-free, ANR/hang, error, funnel, feedback và so sánh với baseline.", "medium"),
      task("sentry-senior", "[Senior] Dùng Sentry cho mobile issue", "Đọc event, breadcrumb, release, environment, user impact và nhóm lỗi để triage nhanh.", "medium"),
      task("datadog-newrelic-senior", "[Senior] Hiểu Datadog/New Relic basic", "Đọc dashboard, trace/log/metric cơ bản và liên kết lỗi client với backend/API.", "medium"),
      task("log-correlation-senior", "[Senior] Correlate app version với API error", "Dùng app version, build number, request id/correlation id, endpoint và error code để tìm pattern lỗi.", "hard"),
      task("impact-estimation-senior", "[Senior] Ước lượng user impact", "Ước lượng số user/session/order bị ảnh hưởng, severity, workaround và mức ưu tiên hotfix.", "hard"),
      task("rollback-senior", "[Senior] Thiết kế rollback/mitigation", "Dùng feature flag, remote config, hotfix, server-side mitigation hoặc rollback release phù hợp.", "hard"),
      task("operation-incident-senior", "[Senior] Xử lý incident sau release", "Triage impact, xác định owner, cập nhật stakeholder và ghi action khắc phục.", "hard"),
      task("postmortem-lead", "[Lead] Viết postmortem không đổ lỗi", "Tóm tắt timeline, root cause, impact, detection gap và action item có owner/deadline.", "hard"),
      task("release-standard-lead", "[Lead] Chuẩn hóa release operation", "Tạo quy trình release, gate, dashboard và on-call handoff để team ship ổn định hơn.", "hard"),
    ],
  },
  {
    id: "team-leadership-communication",
    name: "Team Leadership / Communication",
    description:
      "Đánh giá kỹ năng giao tiếp và dẫn dắt cần cho Senior/Lead: giao việc, review output, estimate, quản lý tiến độ, báo cáo rủi ro, mentoring và stakeholder communication.",
    tasks: [
      task("ticket-middle", "[Middle] Viết ticket dễ hiểu", "Ticket có context, goal, acceptance criteria, scope, dependency, link design/API và definition of done rõ ràng.", "easy"),
      task("task-handoff-middle", "[Middle] Giao task rõ cho member", "Giải thích mục tiêu, output mong đợi, deadline, constraint, tài liệu liên quan và điểm cần hỏi sớm.", "medium"),
      task("estimate-middle", "[Middle] Estimate và cập nhật tiến độ", "Breakdown task, estimate theo rủi ro, cập nhật tiến độ trung thực và báo sớm khi lệch kế hoạch.", "medium"),
      task("risk-report-middle", "[Middle] Báo cáo risk sớm", "Nêu rõ risk, impact, option, recommendation và thời điểm cần quyết định.", "medium"),
      task("review-output-senior", "[Senior] Review output của member", "Review code/design/test plan theo mục tiêu feature, chỉ ra issue quan trọng và feedback có thể hành động.", "hard"),
      task("facilitate-senior", "[Senior] Facilitate meeting hiệu quả", "Dẫn meeting có agenda, decision, owner, deadline; kéo discussion về quyết định thay vì lan man.", "medium"),
      task("stakeholder-senior", "[Senior] Giao tiếp với stakeholder", "Cập nhật status, risk, tradeoff, scope change và expectation bằng ngôn ngữ dễ hiểu với PM/Design/Business.", "hard"),
      task("conflict-senior", "[Senior] Xử lý conflict", "Lắng nghe các bên, tách facts/opinions, đưa option và giúp team chốt hướng đi tôn trọng nhau.", "hard"),
      task("mentoring-lead", "[Lead] 1on1 / mentoring", "Giúp member đặt mục tiêu, review growth, gỡ blocker và tạo cơ hội thực hành phù hợp.", "hard"),
      task("escalation-lead", "[Lead] Escalation đúng lúc", "Biết khi nào cần escalate, gửi đúng người, đúng thông tin, đúng mức khẩn cấp để bảo vệ delivery.", "hard"),
    ],
  },
];

export const defaultLogs: DailyLog[] = [];

export const xpByDifficulty: Record<Difficulty, number> = {
  easy: 50,
  medium: 90,
  hard: 140,
};

export const careerStages = [
  "Junior",
  "Middle",
  "Senior",
  "Tech Lead",
  "Engineering Manager",
  "Principal Engineer",
];

export const skillTreePath = [
  "ios-core",
  "api-backend",
  "database",
  "architecture-system-design",
  "basic-design",
  "detailed-design",
  "test",
  "aws-infra",
  "security",
  "release-operation",
  "requirements",
  "team-leadership-communication",
];

export const levelProgressPresets: Record<LevelNumber, ProgressTargets> = {
  1: { all: 15, skills: { "ios-core": 22 } },
  2: { all: 34, skills: { "ios-core": 50 } },
  3: {
    all: 51,
    skills: {
      "ios-core": 67,
      "basic-design": 50,
      "detailed-design": 50,
      "architecture-system-design": 40,
      "team-leadership-communication": 20,
      "api-backend": 40,
      test: 40,
    },
  },
  4: {
    all: 67,
    skills: {
      "ios-core": 78,
      "basic-design": 60,
      "detailed-design": 60,
      "architecture-system-design": 60,
      "team-leadership-communication": 50,
      "api-backend": 65,
      test: 65,
    },
  },
  5: {
    all: 81,
    skills: {
      "ios-core": 83,
      "basic-design": 80,
      "detailed-design": 80,
      "architecture-system-design": 80,
      "team-leadership-communication": 60,
      "api-backend": 80,
      database: 80,
      "aws-infra": 80,
      security: 80,
      test: 80,
      requirements: 60,
      "release-operation": 70,
    },
  },
  6: {
    all: 100,
    skills: {},
  },
};

export function applyProgressTargets(skills: Skill[], progressTargets: ProgressTargets): Skill[] {
  return skills.map((skill) => {
    const targetProgress = progressTargets.skills[skill.id] ?? progressTargets.all ?? 0;
    const completedCount = Math.round((targetProgress / 100) * skill.tasks.length);

    return {
      ...skill,
      tasks: skill.tasks.map((task, index) => ({
        ...task,
        completed: index < completedCount,
      })),
    };
  });
}

export function createLevelPresetSkills(level: LevelNumber, skills: Skill[] = defaultSkills): Skill[] {
  return applyProgressTargets(skills, levelProgressPresets[level]);
}

export function calculateSkillProgress(skill: Skill): number {
  if (skill.tasks.length === 0) return 0;
  const completed = skill.tasks.filter((taskItem) => taskItem.completed).length;
  return Math.round((completed / skill.tasks.length) * 100);
}

export function calculateTaskXp(taskItem: LearningTask): number {
  return xpByDifficulty[taskItem.difficulty];
}

export function calculateSkillXp(skill: Skill): number {
  return skill.tasks
    .filter((taskItem) => taskItem.completed)
    .reduce((total, taskItem) => total + calculateTaskXp(taskItem), 0);
}

export function calculateTotalXp(skills: Skill[]): number {
  return skills.reduce((total, skill) => total + calculateSkillXp(skill), 0);
}

export function calculateSkillRank(progress: number): SkillRank {
  if (progress >= 100) return "Legendary";
  if (progress >= 90) return "Master";
  if (progress >= 75) return "Expert";
  if (progress >= 60) return "Advanced";
  if (progress >= 40) return "Skilled";
  if (progress >= 15) return "Apprentice";
  return "Novice";
}

export function getSkillStatus(progress: number): SkillStatus {
  if (progress >= 80) return "Mạnh";
  if (progress >= 55) return "Tốt";
  if (progress >= 25) return "Đang học";
  return "Yếu";
}

export function calculateAverageProgress(skills: Skill[]): number {
  if (skills.length === 0) return 0;
  const total = skills.reduce((sum, skill) => sum + calculateSkillProgress(skill), 0);
  return Math.round(total / skills.length);
}

export function calculateLevel(skills: Skill[]): LevelInfo {
  const average = calculateAverageProgress(skills);
  const progressById = new Map(skills.map((skill) => [skill.id, calculateSkillProgress(skill)]));
  const core = progressById.get("ios-core") ?? 0;
  const design = Math.min(progressById.get("basic-design") ?? 0, progressById.get("detailed-design") ?? 0);
  const architecture = progressById.get("architecture-system-design") ?? 0;
  const leadership = progressById.get("team-leadership-communication") ?? 0;
  const requirements = progressById.get("requirements") ?? 0;
  const releaseOperation = progressById.get("release-operation") ?? 0;
  const apiBackend = progressById.get("api-backend") ?? 0;
  const test = progressById.get("test") ?? 0;
  const fullCycle = ["api-backend", "database", "aws-infra", "security", "test", "release-operation"].filter(
    (id) => (progressById.get(id) ?? 0) >= 60,
  ).length;

  if (
    average >= 82 &&
    core >= 88 &&
    design >= 78 &&
    architecture >= 78 &&
    leadership >= 70 &&
    requirements >= 70 &&
    releaseOperation >= 75 &&
    fullCycle >= 5
  ) {
    return {
      level: 6,
      title: "Kỹ sư Full Cycle",
      description:
        "Làm chủ delivery từ yêu cầu đến vận hành, điều phối nhiều bên, chuẩn hóa cách làm và chủ động xử lý rủi ro production.",
    };
  }
  if (average >= 68 && core >= 80 && design >= 65 && architecture >= 65 && leadership >= 55 && fullCycle >= 4) {
    return {
      level: 5,
      title: "Ứng viên trưởng nhóm kỹ thuật",
      description:
        "Có năng lực full-cycle rộng hơn để đưa ra tradeoff và có leadership rõ để dẫn dắt delivery, mentor member.",
    };
  }
  if (average >= 52 && core >= 70 && design >= 55 && architecture >= 45 && leadership >= 30 && apiBackend >= 45 && test >= 45) {
    return {
      level: 4,
      title: "Kỹ sư iOS Senior",
      description:
        "iOS Core vững, thiết kế được feature lớn, hiểu System Design ở mức feature, review kỹ thuật và phối hợp tốt với Backend/QA/PM.",
    };
  }
  if (average >= 35 && core >= 55) {
    return { level: 3, title: "Middle vững", description: "Đang phát triển từ người implement đáng tin cậy thành owner của tính năng." };
  }
  if (average >= 20 || core >= 25) {
    return { level: 2, title: "Kỹ sư iOS Middle", description: "Đang mở rộng năng lực delivery và thiết kế." };
  }
  return { level: 1, title: "Kỹ sư triển khai Junior", description: "Bắt đầu bản đồ phát triển với nền tảng và thói quen delivery." };
}

export function getWeakestSkills(skills: Skill[]): Skill[] {
  return [...skills].sort((a, b) => calculateSkillProgress(a) - calculateSkillProgress(b));
}

export function getRoadmapSkills(skills: Skill[]): Skill[] {
  const byId = new Map(skills.map((skill) => [skill.id, skill]));
  return roadmapOrder.map((id) => byId.get(id)).filter((skill): skill is Skill => Boolean(skill));
}

export function getNextRecommendedTask(skills: Skill[]): { skill: Skill; task: LearningTask } | null {
  for (const skillId of roadmapOrder) {
    const skill = skills.find((item) => item.id === skillId);
    const nextTask = skill?.tasks.find((taskItem) => !taskItem.completed);
    if (skill && nextTask) {
      return { skill, task: nextTask };
    }
  }
  return null;
}

function firstIncompleteTask(skills: Skill[], difficulty?: Difficulty, preferredSkillIds = roadmapOrder) {
  for (const skillId of preferredSkillIds) {
    const skill = skills.find((item) => item.id === skillId);
    const taskItem = skill?.tasks.find((item) => !item.completed && (!difficulty || item.difficulty === difficulty));
    if (skill && taskItem) return { skill, task: taskItem };
  }

  return null;
}

export function getQuestBoard(skills: Skill[]): Quest[] {
  const candidates = [
    {
      category: "Daily" as const,
      rewardCoins: 20,
      source: firstIncompleteTask(skills, "easy") ?? getNextRecommendedTask(skills),
      titlePrefix: "Daily Quest",
    },
    {
      category: "Weekly" as const,
      rewardCoins: 60,
      source: firstIncompleteTask(skills, "medium"),
      titlePrefix: "Weekly Quest",
    },
    {
      category: "Epic" as const,
      rewardCoins: 150,
      source: firstIncompleteTask(skills, "hard", [
        "architecture-system-design",
        "ios-core",
        "team-leadership-communication",
        "release-operation",
        "security",
        ...roadmapOrder,
      ]),
      titlePrefix: "Epic Quest",
    },
  ];

  const usedTaskIds = new Set<string>();

  return candidates
    .filter((candidate) => candidate.source)
    .map((candidate) => {
      const source = candidate.source!;
      usedTaskIds.add(source.task.id);

      return {
        id: `${candidate.category}-${source.task.id}`,
        title: `${candidate.titlePrefix}: ${source.task.title.replace(/^\[[^\]]+\]\s*/, "")}`,
        description: `${source.skill.name} - ${source.task.description}`,
        category: candidate.category,
        rewardXp: calculateTaskXp(source.task),
        rewardCoins: candidate.rewardCoins,
        skillId: source.skill.id,
        taskId: source.task.id,
        completed: source.task.completed,
      };
    })
    .filter((quest, index, quests) => !usedTaskIds.has(quest.taskId) || quests.findIndex((item) => item.taskId === quest.taskId) === index);
}

function toDateKey(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function getStreakStats(logs: DailyLog[], referenceDate = new Date()) {
  const dateSet = new Set(logs.map((log) => log.date));
  let currentStreak = 0;
  const cursor = new Date(referenceDate);

  while (dateSet.has(toDateKey(cursor))) {
    currentStreak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }

  const sortedDates = [...dateSet].sort();
  let bestStreak = 0;
  let running = 0;
  let previous: Date | null = null;

  for (const dateKey of sortedDates) {
    const current = new Date(`${dateKey}T00:00:00`);
    if (previous) {
      const diffDays = Math.round((current.getTime() - previous.getTime()) / 86_400_000);
      running = diffDays === 1 ? running + 1 : 1;
    } else {
      running = 1;
    }
    bestStreak = Math.max(bestStreak, running);
    previous = current;
  }

  return { currentStreak, bestStreak };
}

export function calculateTodayXp(logs: DailyLog[], referenceDate = new Date()): number {
  const todayKey = toDateKey(referenceDate);
  return logs.filter((log) => log.date === todayKey).length * 80;
}

export function calculateWeeklyStudyHours(logs: DailyLog[], referenceDate = new Date()): number {
  const start = new Date(referenceDate);
  start.setHours(0, 0, 0, 0);
  start.setDate(start.getDate() - 6);

  return logs.filter((log) => new Date(`${log.date}T00:00:00`) >= start).length * 2;
}

export function getAchievements(skills: Skill[], logs: DailyLog[]): Achievement[] {
  const totalCompleted = skills.reduce((sum, skill) => sum + skill.tasks.filter((taskItem) => taskItem.completed).length, 0);
  const progressById = new Map(skills.map((skill) => [skill.id, calculateSkillProgress(skill)]));
  const average = calculateAverageProgress(skills);
  const level = calculateLevel(skills).level;
  const streak = getStreakStats(logs).bestStreak;

  return [
    {
      id: "first-quest",
      title: "First Quest",
      description: "Hoàn thành task học tập đầu tiên.",
      rarity: "Common",
      unlocked: totalCompleted >= 1,
    },
    {
      id: "ios-apprentice",
      title: "iOS Apprentice",
      description: "Đưa Nền tảng iOS lên ít nhất 40%.",
      rarity: "Rare",
      unlocked: (progressById.get("ios-core") ?? 0) >= 40,
    },
    {
      id: "system-design-master",
      title: "System Design Master",
      description: "Đưa System Design / Architecture lên ít nhất 75%.",
      rarity: "Epic",
      unlocked: (progressById.get("architecture-system-design") ?? 0) >= 75,
    },
    {
      id: "full-cycle-owner",
      title: "Full Cycle Owner",
      description: "Đạt trung bình 80% và chạm mốc Lv.5 trở lên.",
      rarity: "Legendary",
      unlocked: average >= 80 && level >= 5,
    },
    {
      id: "consistent-learner",
      title: "Consistent Learner",
      description: "Duy trì streak học tập ít nhất 7 ngày.",
      rarity: "Epic",
      unlocked: streak >= 7,
    },
  ];
}
