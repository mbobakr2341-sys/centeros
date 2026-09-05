package email

import (
	"fmt"
	"os"

	"github.com/resend/resend-go/v2"
)

type Service struct {
	client *resend.Client
	from   string
	to     string
}

func NewService() (*Service, error) {
	apiKey := os.Getenv("RESEND_API_KEY")
	if apiKey == "" {
		return nil, fmt.Errorf("RESEND_API_KEY is not configured")
	}

	from := os.Getenv("SMTP_FROM")
	if from == "" {
		from = "centeros@centeros.online"
	}

	to := os.Getenv("BOOKING_TO")
	if to == "" {
		to = "centeros@centeros.online"
	}

	return &Service{
		client: resend.NewClient(apiKey),
		from:   from,
		to:     to,
	}, nil
}

type BookingRequest struct {
	ManagerName      string
	CenterName       string
	Email            string
	Branches         string
	ExpectedStudents string
	AdditionalInfo   string
}

func (s *Service) SendBooking(request BookingRequest) error {
	html := fmt.Sprintf(`
		<h2>New CenterOS Booking Request</h2>

		<p><strong>Manager Name:</strong> %s</p>
		<p><strong>Center / Academy:</strong> %s</p>
		<p><strong>Email:</strong> %s</p>
		<p><strong>Number of Branches:</strong> %s</p>
		<p><strong>Expected Students:</strong> %s</p>
		<p><strong>Additional Information:</strong></p>
		<p>%s</p>

		<hr>

		<p>Sent from the CenterOS website.</p>
	`,
		request.ManagerName,
		request.CenterName,
		request.Email,
		request.Branches,
		request.ExpectedStudents,
		request.AdditionalInfo,
	)

	params := &resend.SendEmailRequest{
		From:    s.from,
		To:      []string{s.to},
		Subject: "New CenterOS Booking Request",
		Html:    html,
	}

	_, err := s.client.Emails.Send(params)
	if err != nil {
		return fmt.Errorf("send booking email: %w", err)
	}

	return nil
}
