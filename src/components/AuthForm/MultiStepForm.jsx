import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import InputField from "./InputField.jsx";
import useRegister from "../../hooks/useRegister/useRegister.js";
import "./styles.css";

const selectClass =
  "w-full h-11 text-sm md:text-base bg-white text-gray-900 " +
  "border border-gray-300 rounded-lg px-3 py-2 " +
  "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 " +
  "placeholder-gray-400 transition-colors duration-150 " +
  "disabled:bg-gray-100 disabled:cursor-not-allowed";

const ReqStar = () => <span className="text-red-500">*</span>;

const API_BASE = "https://adros-mrashed.runasp.net";

export default function RegisterForm() {
  const navigate = useNavigate();
  const { registerAPI, loading } = useRegister();

  const [formData, setFormData] = useState({
    FirstName: "",
    LastName: "",
    Email: "",
    Password: "",
    ConfirmPassword: "",
    StageId: "",
    LevelId: "",
  });

  const [error, setError] = useState("");
  const [stages, setStages] = useState([]);
  const [levels, setLevels] = useState([]);
  const [stageLoading, setStageLoading] = useState(false);
  const [levelLoading, setLevelLoading] = useState(false);
  const [stageError, setStageError] = useState("");
  const [levelError, setLevelError] = useState("");
  const levelsCacheRef = useRef({});
  const levelAbortRef = useRef(null);

  
  useEffect(() => {
    const fetchStages = async () => {
      setStageLoading(true);
      setStageError("");

      try {
        const response = await fetch(`${API_BASE}/api/Stages/all`);

        if (!response.ok) {
          throw new Error('Failed to fetch stages');
        }

        const result = await response.json();
        console.log('Stages API response:', result);

        const stagesData = result.data || result;

        if (!Array.isArray(stagesData)) {
          throw new Error('Invalid stages data format');
        }

        const normalizedStages = stagesData.map(stage => ({
          id: stage.id,
          label: stage.title || stage.name || 'Unknown Stage'
        }));

        console.log('Normalized stages:', normalizedStages);
        setStages(normalizedStages);

      } catch (err) {
        console.error('Error fetching stages:', err);
        setStageError("تعذر تحميل المراحل");
      } finally {
        setStageLoading(false);
      }
    };

    fetchStages();
  }, []);

  useEffect(() => {
    const stageId = formData.StageId;

    if (!stageId) {
      setLevels([]);
      setLevelError("");
      setFormData(prev => ({ ...prev, LevelId: "" }));
      return;
    }

    if (levelsCacheRef.current[stageId]) {
      setLevels(levelsCacheRef.current[stageId]);
      return;
    }

    if (levelAbortRef.current) {
      levelAbortRef.current.abort();
    }

    const abortController = new AbortController();
    levelAbortRef.current = abortController;

    const fetchLevels = async () => {
      setLevelLoading(true);
      setLevelError("");
      setLevels([]);

      try {
        const response = await fetch(
          `${API_BASE}/api/Levels/by-stage/${encodeURIComponent(stageId)}`,
          { signal: abortController.signal }
        );

        if (!response.ok) {
          throw new Error('Failed to fetch levels');
        }

        const result = await response.json();
        console.log('Levels API response:', result);

        const levelsData = result.data || result;

        if (!Array.isArray(levelsData)) {
          throw new Error('Invalid levels data format');
        }

        const normalizedLevels = levelsData.map(level => ({
          id: level.id,
          label: level.title || level.name || 'Unknown Level'
        }));

        console.log('Normalized levels:', normalizedLevels);

        levelsCacheRef.current[stageId] = normalizedLevels;
        setLevels(normalizedLevels);

      } catch (err) {
        if (err.name !== 'AbortError') {
          console.error('Error fetching levels:', err);
          setLevelError("تعذر تحميل الصفوف/المستويات");
        }
      } finally {
        setLevelLoading(false);
      }
    };

    fetchLevels();

    return () => {
      abortController.abort();
    };
  }, [formData.StageId]);

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const {
      FirstName,
      LastName,
      Email,
      Password,
      ConfirmPassword,
      StageId,
      LevelId,
    } = formData;

    if (
      !FirstName ||
      !LastName ||
      !Email ||
      !Password ||
      !ConfirmPassword ||
      !StageId ||
      !LevelId
    ) {
      setError("من فضلك املأ جميع الحقول المطلوبة");
      return;
    }

    if (!isValidEmail(Email)) {
      setError("يرجى إدخال بريد إلكتروني صحيح");
      return;
    }

    if (Password.length < 6) {
      setError("كلمة السر يجب أن تكون على الأقل 6 أحرف");
      return;
    }

    if (Password !== ConfirmPassword) {
      setError("كلمة السر وتأكيدها غير متطابقين");
      return;
    }

    setError("");

    const apiData = {
      firstName: FirstName,
      lastName: LastName,
      email: Email,
      password: Password,
      confirmPassword: ConfirmPassword,
      levelId: LevelId,
      stageId: StageId, 
    };

    console.log('Submitting registration:', apiData);

    const response = await registerAPI(apiData);

    if (response?.success) {
      setTimeout(() => navigate("/login"), 500);
    } else {
      setError(response?.message || "حدث خطأ أثناء التسجيل");
    }
  };

  return (
    <div className="relative z-10">
      <form
        onSubmit={handleSubmit}
        noValidate
        dir="rtl"
        className="flex flex-col items-center justify-center min-h-screen bg-transparent px-4 py-10 lg:px-16 gap-6"
      >
        {/* عنوان الصفحة */}
        <div className="w-full text-center mb-6">
          <h2 className="text-2xl font-bold text-blue-600">انضم إلينا!</h2>
          <p className="text-gray-500 mt-2">ابدأ رحلتك التعليمية معنا اليوم</p>
        </div>

        {/* الفورم */}
        <div className="relative w-[97%] md:w-[80%] lg:w-[50%] bg-white p-6 rounded-3xl shadow-2xl">
          <h2 className="text-xl font-semibold text-right mb-4">المعلومات الشخصية</h2>

          <div className="mb-4 flex flex-col gap-4">
            {/* الاسم الأول و الأخير */}
            <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
              <div className="w-full md:w-1/2">
                <InputField
                  label="الاسم الأول"
                  type="text"
                  name="FirstName"
                  placeholder="ادخل الاسم الأول"
                  value={formData.FirstName}
                  onChange={(e) =>
                    setFormData({ ...formData, FirstName: e.target.value })
                  }
                />
              </div>
              <div className="w-full md:w-1/2">
                <InputField
                  label="الاسم الأخير"
                  type="text"
                  name="LastName"
                  placeholder="ادخل الاسم الأخير"
                  value={formData.LastName}
                  onChange={(e) =>
                    setFormData({ ...formData, LastName: e.target.value })
                  }
                />
              </div>
            </div>

            {/* المرحلة والصف/المستوى */}
            <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
              {/* المرحلة */}
              <div className="w-full md:w-1/2">
                <label className="block text-right text-sm font-medium text-gray-700 mb-1">
                  اختر المرحلة <ReqStar />
                </label>
                <select
                  name="StageId"
                  value={formData.StageId}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      StageId: e.target.value,
                      LevelId: "",
                    })
                  }
                  className={selectClass}
                  disabled={stageLoading}
                >
                  <option value="">
                    {stageLoading ? "— جاري التحميل… —" : "— اختر المرحلة —"}
                  </option>
                  {stageError && <option value="" disabled>{stageError}</option>}
                  {!stageLoading &&
                    !stageError &&
                    stages.map((stage) => (
                      <option key={stage.id} value={stage.id}>
                        {stage.label}
                      </option>
                    ))}
                </select>
              </div>

              {/* الصف/المستوى */}
              <div className="w-full md:w-1/2">
                <label className="block text-right text-sm font-medium text-gray-700 mb-1">
                  اختر الصف / المستوى <ReqStar />
                </label>
                <select
                  name="LevelId"
                  value={formData.LevelId}
                  onChange={(e) =>
                    setFormData({ ...formData, LevelId: e.target.value })
                  }
                  disabled={!formData.StageId || levelLoading}
                  className={`${selectClass} ${!formData.StageId || levelLoading ? "opacity-60" : ""
                    }`}
                >
                  <option value="">
                    {!formData.StageId
                      ? "اختر المرحلة أولاً"
                      : levelLoading
                        ? "— جاري التحميل… —"
                        : "— اختر الصف / المستوى —"}
                  </option>
                  {levelError && <option value="" disabled>{levelError}</option>}
                  {!levelLoading &&
                    !levelError &&
                    levels.map((level) => (
                      <option key={level.id} value={level.id}>
                        {level.label}
                      </option>
                    ))}
                </select>
              </div>
            </div>

            {/* البريد الإلكتروني - بدلاً من رقم الهاتف */}
            <InputField
              label="البريد الإلكتروني"
              type="email"
              name="Email"
              placeholder="example@domain.com"
              value={formData.Email}
              onChange={(e) =>
                setFormData({ ...formData, Email: e.target.value })
              }
            />

            {/* كلمة السر */}
            <InputField
              label="كلمة السر"
              type="password"
              name="Password"
              placeholder="ادخل كلمة السر"
              value={formData.Password}
              onChange={(e) =>
                setFormData({ ...formData, Password: e.target.value })
              }
            />

            {/* تأكيد كلمة السر */}
            <InputField
              label="تأكيد كلمة السر"
              type="password"
              name="ConfirmPassword"
              placeholder="ادخل كلمة السر مرة اخرى"
              value={formData.ConfirmPassword}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  ConfirmPassword: e.target.value,
                })
              }
            />

            {/* رسالة الخطأ العامة */}
            {error && <p className="text-red-500 text-sm text-right">{error}</p>}
          </div>

          {/* زر التسجيل */}
          <div className="flex flex-col gap-4 justify-between">
            <button
              type="submit"
              disabled={loading || stageLoading}
              className={`px-4 py-2 w-full text-white rounded-lg cursor-pointer ${loading || stageLoading
                ? "bg-gray-400"
                : "bg-blue-700 hover:bg-blue-800 bold"
                }`}
            >
              {loading ? "جارٍ التسجيل..." : "إنشاء حساب"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}