from sqlalchemy import create_engine, inspect, text
from sqlalchemy.orm import declarative_base, sessionmaker

SQLALCHEMY_DATABASE_URL = "sqlite:///./tickets.db"
engine = create_engine(
    SQLALCHEMY_DATABASE_URL,
    connect_args={"check_same_thread": False},
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()


def migrate_schema():
    inspector = inspect(engine)
    history_columns = {
        column["name"] for column in inspector.get_columns("ticket_status_history")
    }

    if "evidence" not in history_columns:
        with engine.begin() as connection:
            connection.execute(
                text(
                    "ALTER TABLE ticket_status_history "
                    "ADD COLUMN evidence VARCHAR NULL"
                )
            )


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()