export async function onRequestPost(context) {
  try {
    const data = await context.request.json();

    if (!data.ManagerName || !data.CenterName || !data.Email) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "manager name, center name and email are required",
        }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${context.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "CenterOS <centeros@centeros.online>",
        to: ["centeros@centeros.online"],
        reply_to: data.Email,
        subject: `طلب حجز جديد - ${data.CenterName}`,
        html: `
          <h2>طلب حجز جديد من موقع CenterOS</h2>

          <p><strong>اسم المسؤول:</strong> ${data.ManagerName}</p>
          <p><strong>اسم المركز:</strong> ${data.CenterName}</p>
          <p><strong>البريد الإلكتروني:</strong> ${data.Email}</p>
          <p><strong>عدد الفروع:</strong> ${data.Branches || "-"}</p>
          <p><strong>عدد الطلاب المتوقع:</strong> ${data.ExpectedStudents || "-"}</p>
          <p><strong>معلومات إضافية:</strong> ${data.AdditionalInfo || "-"}</p>
        `,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Resend error:", errorText);

      return new Response(
        JSON.stringify({
          success: false,
          message: "failed to send booking request",
        }),
        {
          status: 500,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: "booking request received successfully",
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Booking function error:", error);

    return new Response(
      JSON.stringify({
        success: false,
        message: "invalid request",
      }),
      {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
